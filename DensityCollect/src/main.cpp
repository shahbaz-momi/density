#define CHANNEL_SWEEP_TIME 1000
#define IGNORE_CHANNEL 13
#define MAX_CHANNEL 14

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
int channel = 1;

void loop()
{
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
