#include "circle_intersection.cpp"
#include <cstring>
//#include "comms.cpp"

#include <iostream>

int main() {
    Circle circles[3] = {
            {2.0, 0.0, 0.0},
            {2.0, 3.0, 0.0},
            {2.0, 0.0, -3.0}
    };

    Point out;

    auto num_intr = CircleIntersection::getIntersectionPoints(circles, 3)->size();

    cout << num_intr << endl;

    Rectangle temp;

    if(num_intr == 6) {
        // ideal 3 circle intersection
        auto rect = CircleIntersection::getBoundingRect(circles, 3);

        out.x = rect.x + rect.width / 2;
        out.y = rect.y + rect.height / 2;
    } else if(num_intr == 4) {
        Circle* a[2];
        Circle* b[2];

        // 2 circles intersect into 1
        // compute the 2 bounding boxes of the intersections,
        // and then average the points
        auto intrs_01 = CircleIntersection::getIntersectionPoints(circles, 2);

        if(intrs_01->empty()) {
            // 02, 12 intersected
            a[0] = &circles[0];
            a[1] = &circles[2];

            b[0] = &circles[1];
            b[1] = &circles[2];
        } else {
            auto intrs_12 = CircleIntersection::getIntersectionPoints(circles + 1, 2);
            if(intrs_12->empty()) {
                // 01, 02 intersected
                a[0] = &circles[0];
                a[1] = &circles[1];

                b[0] = &circles[0];
                b[1] = &circles[2];
            } else {
                // 01, 12 intersected
                a[0] = &circles[0];
                a[1] = &circles[1];

                b[0] = &circles[1];
                b[1] = &circles[2];
            }
        }

        Rectangle ra;
        Rectangle rb;

        temp = CircleIntersection::getBoundingRect(a, 2);
        memcpy(&ra, &temp, sizeof(Rectangle));
        temp = CircleIntersection::getBoundingRect(b, 2);
        memcpy(&rb, &temp, sizeof(Rectangle));

        out.x = ((ra.x + ra.width / 2) + (rb.x + rb.width / 2)) / 2;
        out.y = ((ra.y + ra.height / 2) + (rb.y + rb.height / 2)) / 2;
    } else if(num_intr == 2) {
        // 1 circle intersects into 1
        // just use the bounding of the intersection
        auto intrs_01 = CircleIntersection::getIntersectionPoints(circles, 2);
        if(!intrs_01->empty()) {
            // 01
            temp = CircleIntersection::getBoundingRect(circles, 2);
        } else {
            auto intrs_12 = CircleIntersection::getIntersectionPoints(circles + 1, 2);
            if(!intrs_12->empty()) {
                // 12
                temp = CircleIntersection::getBoundingRect(circles + 1, 2);
            } else {
                // 02
                Circle* a[2];
                a[0] = &circles[0];
                a[1] = &circles[2];
                temp = CircleIntersection::getBoundingRect(a, 2);
            }
        }

        out.x = temp.x + temp.width / 2;
        out.y = temp.y + temp.height / 2;
    } else if(num_intr == 0) {
        // no intersections at all
        //
    }

//    auto rect = CircleIntersection::getBoundingRect(circles, 3);

    cout << "x: " << out.x << " y: " << out.y << endl;

//    cout << "x: " << rect.x << " y: " << rect.y << " w: " << rect.width << " h: " << rect.height << endl;
}