#include <Arduino.h>

#ifndef CACHE_HPP
#define CACHE_HPP

#define DEVICE_CAPACITY 500
#define SAMPLE_CAPACITY 10

#define DEAD 0
#define ALIVE 1

// 22 bytes for frame * DEVICE_CAPACITY = 11,000 bytes
struct MacEntry {
    uint8_t mac[6] = {0}; // 6 bytes for the mac
    signed int samples[SAMPLE_CAPACITY] = {0}; // 10 bytes of samples
    uint16_t num_occurrences = 0; // 2 bytes for number of occurrences 
    unsigned long last_receive_time = 0; // 4 bytes for the last received time (unsigned long is the millis() type)
};

struct __MacEntry {
    MacEntry m;
    uint8_t state = DEAD; // default to dead to allow
};

class MacCache {

public:
    void occurrence(const uint8_t mac[6], int rssi);

    void report();

    void sweep();

    unsigned long count();

    const __MacEntry* get_entries();
private:
    unsigned long total_since_sweep;
    __MacEntry entries[DEVICE_CAPACITY];

    unsigned long hash(const uint8_t mac[6], const unsigned long size);
};

#endif