#include "circle_intersection.cpp"

#include <iostream>

int main() {
    Circle circles[3] = {
            {2.0, 0.0, 0.0, 0},
            {3.0, 3.0, 3.0, 1},
            {3.0, 3.0, -2.0, 2}
    };

    auto rect = CircleIntersection::getBoundingRect(circles, 3);

    cout << "x: " << rect.x << " y: " << rect.y << " w: " << rect.width << " h: " << rect.height << endl;
}