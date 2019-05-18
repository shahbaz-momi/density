#include "rssi_estimation.hpp"
#include "cmath"


double RssiEstimation::rssi_to_distance(signed int rssi) {
    double n = -0.043 * pow(rssi, 5) - 4.92 * pow(rssi, 4) - 171.5 * pow(rssi, 3) - 600.8 * pow(rssi, 2) + 41.41 * rssi - 0.84;
    double d = pow(rssi, 4) + 250.4 * pow(rssi, 3) + 14780.0 * pow(rssi, 2) - 455.9 * rssi + 12.24;
    return n / d;
}