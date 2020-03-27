# Density
## TO DO

- [X] Density v1.0 completed

## Video + Screenshots
https://ruhacks2019.hackerearth.com/challenges/hackathon/ru-hacks-2019/dashboard/1e422e1/submission/

## Project Description

In a world with such a prominent integration of technology, we continue to struggle in the task of gathering quantitative data on human behaviour. With density, we provide a software solution to modelling human movement and density patterns through data collected through smartphone locations. This technology provides an innovate solution to many global issues such as emergency service response times, inventory systems and improves accessibility.

In essence, our project can anonymously collect data from the billions of wifi frames that are broadcast by smart devices every day, and apply them to generate location data around a localized area. This localized area consists of boundaries we define, and can be to any scale we want. E.g. A small room or an entire football field. The only difference is the number of collectors. For about every 25 sq. ft, we need about 4 ESP8266 microcontrollers, which are basically Arduinos with built in 2.4Ghz wifi support, and are also ridiculously cheap (about 1$ a piece!). With this robust collection framework in place, we also form a mesh network between the ESP8266s to transmit data seamlessly without having to resort to external means (all transported on a WPA2 network with AES encryption).

To maintain security and privacy, we generate a unique device id per encountered device, which consists of a SHA1 hash of the device's MAC address and a salt. This allows us to fully anonymize to any sensitive data, while also having a means to identify individual devices if need be. Also, this data is publicly broadcasted regardless, we are not interacting with the devices in any way.

The implications for these metrics and data are huge, as detailed in the presentation. It could be implemented in any manner of commercial products to government systems. We simply intend to provide the framework with a few examples/typical usage scenarios, opening the door to the rest of the community to leverage and use our work. We think we can provide a safe and standardized metrics to any interested parties, and are already looking into prime potential proof of concepts to truly showcase the power of our framework.

## Running Project

Since this is a hardware hack with an integrated web app, it is not possible to run the project without having the hardware. A demo can be found [here](https://www.youtube.com/watch?v=u7bR5Q-RWdE). If the hardware is present, this program can be run by:

```installation:
git clone https://github.com/adichha/wifi-triangularization.git
cd density
cd densitycompute
cd cmake-build-debug
./DensityCompute.exe
cd .. 
cd densityintegrate
npm install
node server.js
cd ..
cd densityvisualize 
npm install
npm run
```
