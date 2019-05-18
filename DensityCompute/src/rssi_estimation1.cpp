#include "rssi_estimation.hpp"
#include "cmath"

double RssiEstimation::rssi_to_distance(signed int rssi) {
    return (pow(10.0, (rssi - 18.67) / (-47.37)));
}