cmake_minimum_required(VERSION 3.5)
project(DensityCompute)

set(CMAKE_CXX_STANDARD 14)

add_executable(DensityCompute src/main.cpp src/SerialPort.cpp src/comms.cpp src/rssi_estimation3.cpp)
#add_executable(Tests src/testing.cpp)
