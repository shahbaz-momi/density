#include <Arduino.h>
#include "cache.hpp"
#include "string_utils.h"

#ifndef CACHE_CPP
#define CACHE_CPP

void MacCache::occurrence(const uint8_t mac[6], int rssi) {
    if(mac[0] != 0x64 && mac[1] != 0xa2 && mac[2] != 0xf9
        && mac[3] != 0xbd && mac[4] != 0x11 && mac[5] != 25)
        return;
        
    total_since_sweep++;
    auto h = hash(mac, DEVICE_CAPACITY);
    for(int i = 0; i < DEVICE_CAPACITY; i ++) {
        auto index = (h + i) % DEVICE_CAPACITY;
        auto p = &entries[index].m;

        if(entries[index].state == DEAD) {
            // we use this slot
            entries[index].state = ALIVE;
            memcpy(p->mac, mac, 6);
            p->num_occurrences = 1;
            p->last_receive_time = millis();
            p->samples[p->num_occurrences % SAMPLE_CAPACITY] = rssi;

            return;
        }

        // this node is alive, so test it
        if(memcmp(mac, p->mac, 6) == 0) { // we found it
            p->num_occurrences ++;
            p->last_receive_time = millis();
            p->samples[p->num_occurrences % SAMPLE_CAPACITY] = rssi;
            return;
        } 
    }

    // we are over capacity
    // TODO: what to do here?
}

void MacCache::report() {
    for(int i = 0; i < DEVICE_CAPACITY; i ++) {
        if(entries[i].state == ALIVE) {
            char addr[] = "00:00:00:00:00:00\0";

            mac2str(entries[i].m.mac, addr);

            Serial.print("For mac: ");
            Serial.print(addr);
            Serial.print(" got num_occurrences = ");
            Serial.print(entries[i].m.num_occurrences);
            Serial.print(" sample = [ ");
            for(int j = 0; j < SAMPLE_CAPACITY; j ++) {
                auto num = entries[i].m.samples[j];
                if(num != 0) {
                    Serial.print(num);
                    Serial.print(" ");
                }
            }

            Serial.println(" ]");
        }
    }
}

void MacCache::sweep() {
    total_since_sweep = 0;
    // just null everything
    memset(entries, 0, sizeof(entries));
}

const __MacEntry* MacCache::get_entries() {
    return entries;
}

unsigned long MacCache::count() {
    return total_since_sweep;
}

unsigned long MacCache::hash(const uint8_t mac[6], const unsigned long size) {
    // sum up and wrap
    return (mac[0] + mac[1] + mac[2] + mac[3] + mac[4] + mac[5]) % size;
}   


#endif