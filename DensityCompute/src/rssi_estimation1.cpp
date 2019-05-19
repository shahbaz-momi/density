#include "rssi_estimation.hpp"
#include "cmath"

#define A -66
#define n 1.84

double RssiEstimation::rssi_to_distance(double rssi) {
    return (pow(10.0, -(rssi - A) / (10 * n)));
}