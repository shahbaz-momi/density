#include <Arduino.h>

#include <ESP8266WiFi.h>
#include "painlessMesh.h"

#define BUFFER_SIZE 20000

#define MESH_SSID "density_mesh"
#define MESH_PSK "4a9g3F0ZZ2jI49"
#define MESH_PORT 5555
#define MESH_AP_CHANNEL 13

uint8_t buffer[BUFFER_SIZE] = {0};
unsigned int offset = -1;

painlessMesh mesh;

void setup() {
  Serial.begin(921600);

  mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  // init with set parameters, hidden ssid
  // and 255 max devices
  mesh.init(MESH_SSID, MESH_PSK, MESH_PORT, WIFI_AP_STA, MESH_AP_CHANNEL, 0, 255);
}

void loop() {
  int avail = Serial.available();
  if(avail != 0) {
    while(avail > 0) {
      uint8_t in = Serial.read();

      if(in == '[') {
        // start marker
        offset = 0;
      } else if(in == ']') {
        // offset is the length at this point
        const char* buf = (const char*) buffer;
        String msg(buf);

        mesh.sendBroadcast(msg, false);

        offset = -1;
        memset(buffer, 0, sizeof(buffer));
      } else {
        buffer[offset] = in;
        offset++;
      }

      avail --;
    }
  }
  
  mesh.update();
}