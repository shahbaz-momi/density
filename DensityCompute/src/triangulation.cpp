#include <cstring>
#include "circle_intersection.cpp"

#define DIST_SIGNED_SHIFT 10
#define USE_CONST_SHIFT false
#define NONCONST_INCLUSION_FACTOR 1.6

class Triangulation {

public:
    static Point* triangulate(Circle circles[3]) {
        auto out = new Point;

        auto intr = CircleIntersection::getIntersectionPoints(circles, 3);
        const auto num_intr = intr->size();
        CircleIntersection::cleanIntersectionPoints(intr);

        Rectangle_t temp;

        if(num_intr == 6) {
            // ideal 3 circle intersection
            auto rect = CircleIntersection::getBoundingRect(circles, 3);

            out->x = rect.x + rect.width / 2;
            out->y = rect.y + rect.height / 2;
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

                CircleIntersection::cleanIntersectionPoints(intrs_12);
            }

            CircleIntersection::cleanIntersectionPoints(intrs_01);

            Rectangle_t ra;
            Rectangle_t rb;

            temp = CircleIntersection::getBoundingRect(a, 2);
            memcpy(&ra, &temp, sizeof(Rectangle_t));
            temp = CircleIntersection::getBoundingRect(b, 2);
            memcpy(&rb, &temp, sizeof(Rectangle_t));

            out->x = ((ra.x + ra.width / 2) + (rb.x + rb.width / 2)) / 2;
            out->y = ((ra.y + ra.height / 2) + (rb.y + rb.height / 2)) / 2;
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

                CircleIntersection::cleanIntersectionPoints(intrs_12);
            }

            CircleIntersection::cleanIntersectionPoints(intrs_01);

            out->x = temp.x + temp.width / 2;
            out->y = temp.y + temp.height / 2;
        } else if(num_intr == 0) {
            // no intersections at all
            out->x = 0;
            out->y = 0;

            double shift;
            if(USE_CONST_SHIFT) {
                shift = DIST_SIGNED_SHIFT;
            } else {
                shift = circles[0].radius;
                if (circles[1].radius > shift) shift = circles[1].radius;
                if (circles[2].radius > shift) shift = circles[2].radius;

                shift *= NONCONST_INCLUSION_FACTOR;
            }


            double d = -circles[0].radius + -circles[1].radius + -circles[2].radius + 3 * shift;

            for(int i = 0; i < 3; i ++) {
                double scale = (-circles[i].radius + shift) / d;
                out->x += circles[i].x * scale;
                out->y += circles[i].y * scale;
            }
        }

        return out;
    }
};