#include "triangulation.cpp"

//#include "comms.cpp"

#include <iostream>

int main() {
    Circle circles[3] = {
            {2.0, 0.0, 2.0},
            {1.0, 6.0, 0.0},
            {3.0, 0.0, -6.0}
    };

    auto out = Triangulation::triangulate(circles);

    cout << "x: " << out->x << " y: " << out->y << endl;

    delete out;
}