#include "rssi_estimation.hpp"
#include "cmath"

double RssiEstimation::rssi_to_distance(double rssi) {
    // map -24 to 0, -60 to 1.524
    return (1.524 / (-60 - (-24))) * rssi - 1.0;
}