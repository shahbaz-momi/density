#define CHANNEL_SWEEP_TIME 1000
#define IGNORE_CHANNEL 13
#define MAX_CHANNEL 14

#define DEFAULT_CHANNEL 1

#define NODE_ID "4"

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "sdk_structs.h"
#include "ieee80211_structs.h"
#include "string_utils.h"

#include "common.hpp"

#include "cache.hpp"

extern "C"
{
#include "user_interface.h"
}

MacCache cache;
int channel = DEFAULT_CHANNEL;

// According to the SDK documentation, the packet type can be inferred from the
// size of the buffer. We are ignoring this information and parsing the type-subtype
// from the packet header itself. Still, this is here for reference.
wifi_promiscuous_pkt_type_t packet_type_parser(uint16_t len)
{
    switch(len)
    {
        // If only rx_ctrl is returned, this is an unsupported packet
        case sizeof(wifi_pkt_rx_ctrl_t):
            return WIFI_PKT_MISC;

            // Management packet
        case sizeof(wifi_pkt_mgmt_t):
            return WIFI_PKT_MGMT;

            // Data packet
        default:
            return WIFI_PKT_DATA;
    }
}

// In this example, the packet handler function does all the parsing and output work.
// This is NOT ideal.
void wifi_sniffer_packet_handler(uint8_t *buff, uint16_t len)
{
    // First layer: type cast the received buffer into our generic SDK structure
    const wifi_promiscuous_pkt_t *ppkt = (wifi_promiscuous_pkt_t *)buff;
    // Second layer: define pointer to where the actual 802.11 packet is within the structure
    const wifi_ieee80211_packet_t *ipkt = (wifi_ieee80211_packet_t *)ppkt->payload;
    // Third layer: define pointers to the 802.11 packet header and payload
    const wifi_ieee80211_mac_hdr_t *hdr = &ipkt->hdr;
    // const uint8_t *data = ipkt->payload;

    // Pointer to the frame control section within the packet header
    const wifi_header_frame_control_t *frame_ctrl = (wifi_header_frame_control_t *)&hdr->frame_ctrl;

    // store the addresses in the cache
    // NOTE: always use the sender address
    // for proper rssi receival
    if(frame_ctrl->to_ds == 0 && frame_ctrl->from_ds == 0) { // 00
        // addr2 == SA
        cache.occurrence(hdr->addr2, ppkt->rx_ctrl.rssi);
    } else if(frame_ctrl->to_ds == 1 && frame_ctrl->from_ds == 0) { // 10
        // addr2 == SA
        cache.occurrence(hdr->addr2, ppkt->rx_ctrl.rssi);
    } else if(frame_ctrl->to_ds == 0 && frame_ctrl->from_ds == 1) { // 01
        // addr3 == SA
        cache.occurrence(hdr->addr3, ppkt->rx_ctrl.rssi);
    } else { // 11
        // never
    }

    // Parse MAC addresses contained in packet header into human-readable strings
    // char addr1[] = "00:00:00:00:00:00\0";
    // char addr2[] = "00:00:00:00:00:00\0";
    // char addr3[] = "00:00:00:00:00:00\0";

    // mac2str(hdr->addr1, addr1);
    // mac2str(hdr->addr2, addr2);
    // mac2str(hdr->addr3, addr3);

    // // Output info to serial
    // Serial.printf("\n%s | %s | %s | %u | %02d | %u | %u(%-2u) | %-28s | %u | %u | %u | %u | %u | %u | %u | %u | ",
    //   addr1,
    //   addr2,
    //   addr3,
    //   wifi_get_channel(),
    //   ppkt->rx_ctrl.rssi,
    //   frame_ctrl->protocol,
    //   frame_ctrl->type,
    //   frame_ctrl->subtype,
    //   wifi_pkt_type2str((wifi_promiscuous_pkt_type_t)frame_ctrl->type, (wifi_mgmt_subtypes_t)frame_ctrl->subtype),
    //   frame_ctrl->to_ds,
    //   frame_ctrl->from_ds,
    //   frame_ctrl->more_frag,
    //   frame_ctrl->retry,
    //   frame_ctrl->pwr_mgmt,
    //   frame_ctrl->more_data,
    //   frame_ctrl->wep,
    //   frame_ctrl->strict);

    // // Print ESSID if beacon
    // if (frame_ctrl->type == WIFI_PKT_MGMT && frame_ctrl->subtype == BEACON)
    // {
    //   const wifi_mgmt_beacon_t *beacon_frame = (wifi_mgmt_beacon_t*) ipkt->payload;
    //   char ssid[32] = {0};

    //   if (beacon_frame->tag_length >= 32)
    //   {
    //     strncpy(ssid, beacon_frame->ssid, 31);
    //   }
    //   else
    //   {
    //     strncpy(ssid, beacon_frame->ssid, beacon_frame->tag_length);
    //   }

    //   Serial.printf("%s", ssid);
    // }
}

void dump_serial() {
// report like so:
// START FRAME MARKER:
// CHANNEL <channel>
// REPORT <report>
// END FRAME MARKER
    Serial.print(FRAME_START);

    Serial.print(channel);
    Serial.print(SECTION_DIVIDER);

    Serial.print(NODE_ID);
    Serial.print(SECTION_DIVIDER);


    auto entries = cache.get_entries();

    for(int i = 0; i < DEVICE_CAPACITY; i ++) {
        if(entries[i].state == ALIVE) {
            // output it
            char addr[] = "00:00:00:00:00:00\0";
            mac2str(entries[i].m.mac, addr);

            Serial.print(addr);
            Serial.print(SEGMENT_DIVIDER);
            for(int j = 0; j < SAMPLE_CAPACITY; j ++) {
                auto num = entries[i].m.samples[j];
                if(num != 0) {
                    Serial.print(num);
                    Serial.print(SEGMENT_DIVIDER);
                }
            }
            Serial.print(entries[i].m.num_occurrences);
            Serial.print(SECTION_DIVIDER);
        }
    }

    Serial.print(FRAME_END);
}

void setup()
{
    // Serial setup
    Serial.begin(921600);
    delay(10);
    wifi_set_channel(channel);

    // Wifi setup
    wifi_set_opmode(STATION_MODE);
    wifi_promiscuous_enable(0);
    WiFi.disconnect();

    // Set sniffer callback
    wifi_set_promiscuous_rx_cb(wifi_sniffer_packet_handler);
    wifi_promiscuous_enable(1);
}

unsigned long last_exec_time = 0;

void loop()
{
    if(Serial.available()) {
        // reset channel and last_exec time
        Serial.read();
        
        channel = DEFAULT_CHANNEL;
        last_exec_time = millis();
    }

    if(last_exec_time == 0) {
        last_exec_time = millis();
        return;
    }

    if(millis() - last_exec_time >= CHANNEL_SWEEP_TIME) {
        wifi_promiscuous_enable(0);
        if(++channel > MAX_CHANNEL) {
            channel = 1;
        }
        if(channel == IGNORE_CHANNEL)
            channel ++;
        if(channel > MAX_CHANNEL) {
            channel = 1;
        }

        wifi_set_channel(channel);

        if(cache.count() > 0)
            dump_serial();

        // TODO: add delay to allow cache to be buffered
        cache.sweep();

        // BACKEND: use the channel for each device with the highest RSSI
        // then kinda cache that channel

        wifi_promiscuous_enable(1);

        last_exec_time = millis();
    }
}
