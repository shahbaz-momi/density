#include <vector>
#include <cmath>

#include <iostream>

#include <algorithm>

#ifndef CIRCLE_INTERSECTION_CPP
#define CIRCLE_INTERSECTION_CPP

#define SMALL 1e-10

using namespace std;

typedef struct {
    double x;
    double y;
} Point;

typedef struct {
    double radius;
    double x;
    double y;
} Circle;

typedef struct {
    double x;
    double y;

    double width;
    double height;
} Rectangle;

class CircleIntersection {

public:
    static Rectangle getBoundingRect(Circle *circles, int len);
    static Rectangle getBoundingRect(Circle *circles[], int len);

    static Point *circleCircleIntersection(Circle p1, Circle p2);

    static bool containedInCircles(Point p, Circle *circles, int num);

    static double distance(Circle p1, Circle p2);

    static double distance(Point p1, Circle p2);

    static double distance(Point p1, Point p2);

    static vector<Point*> *getIntersectionPoints(Circle *circles, int len);

};

/**
 * NO ALLOCS
 */
bool CircleIntersection::containedInCircles(Point p, Circle *circles, int num) {
    for (int i = 0; i < num; i++) {
        if (distance(p, circles[i]) > circles[i].radius + SMALL) {
            return false;
        }
    }

    return true;
}

/**
 *  HEAP ALLOCS: vector, points in the vector are on the heap.
 */
vector<Point*>* CircleIntersection::getIntersectionPoints(Circle* circle, int len) {
    auto ret = new vector<Point*>();

    for (int i = 0; i < len; ++i) {
        for (int j = i + 1; j < len; ++j) {
            Point* intersect = circleCircleIntersection(circle[i], circle[j]);

            if (intersect != nullptr) {
                auto p0 = new Point();
                auto p1 = new Point();

                p0->x = intersect[0].x; p0->y = intersect[0].y;
                p1->x = intersect[1].x; p1->y = intersect[1].y;

                delete intersect;

                ret->push_back(p0);
                ret->push_back(p1);
            }
        }
    }
    return ret;
}

/**
 * NO ALLOCS
 */
double CircleIntersection::distance(Circle p1, Circle p2) {
    return sqrt((p1.x - p2.x) * (p1.x - p2.x) +
                (p1.y - p2.y) * (p1.y - p2.y));
};

/**
 * NO ALLOCS
 */
double CircleIntersection::distance(Point p1, Circle p2) {
    return sqrt((p1.x - p2.x) * (p1.x - p2.x) +
                (p1.y - p2.y) * (p1.y - p2.y));
};

/**
 * NO ALLOCS
 */
double CircleIntersection::distance(Point p1, Point p2) {
    return sqrt((p1.x - p2.x) * (p1.x - p2.x) +
                (p1.y - p2.y) * (p1.y - p2.y));
};

/**
 * HEAP return: new double[2].
 */
Point *CircleIntersection::circleCircleIntersection(Circle p1, Circle p2) {
    double d = distance(p1, p2);
    double r1 = p1.radius;
    double r2 = p2.radius;

    // if to far away, or self contained - can't be done
    if ((d >= (r1 + r2)) || (d <= abs(r1 - r2))) {
        return nullptr;
    }

    double a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    double h = sqrt(r1 * r1 - a * a);
    double x0 = p1.x + a * (p2.x - p1.x) / d;
    double y0 = p1.y + a * (p2.y - p1.y) / d;
    double rx = -(p2.y - p1.y) * (h / d);
    double ry = -(p2.x - p1.x) * (h / d);

    auto out = new Point[2];
    out[0].x = x0 + rx;
    out[0].y = y0 - ry;
    out[1].x = x0 - rx;
    out[1].y = y0 + ry;

    return out;
};

Rectangle CircleIntersection::getBoundingRect(Circle* circles[], int len) {
    auto temp = new Circle[len];
    for(int i = 0; i < len; i ++) {
        temp[i] = *circles[i];
    }

    Rectangle r = getBoundingRect(temp, len);
    delete[] temp;
    return r;
}

Rectangle CircleIntersection::getBoundingRect(Circle* circles, int len) {
    auto intersectionPoints = getIntersectionPoints(circles, len);
    auto filtered = new vector<Point>();

    for (int i = 0; i < intersectionPoints->size(); i++) {
        if (containedInCircles(*intersectionPoints->at(i), circles, len)) {
            filtered->push_back(*intersectionPoints->at(i));
        }
    }

    double x1 = numeric_limits<double>::max();
    double y1 = numeric_limits<double>::max();
    double x2 = numeric_limits<double>::min();
    double y2 = numeric_limits<double>::min();

    for(const auto & point : *filtered) {
        if(point.x < x1)
            x1 = point.x;
        if(point.y < y1)
            y1 = point.y;
        if(point.x > x2)
            x2 = point.x;
        if(point.y > y2)
            y2 = point.y;
    }

    for(int i = 0; i < len; i ++) {
        auto p = circles[i];

        if((p.x - p.radius < x1) && containedInCircles({p.x - p.radius, p.y}, circles, len)) {
            x1 = p.x - p.radius;
        }

        if ((p.x + p.radius > x2) && containedInCircles({p.x + p.radius, p.y}, circles, len)) {
            x2 = p.x + p.radius;
        }

        if ((p.y - p.radius < y1) && containedInCircles({p.x, p.y - p.radius}, circles, len)) {
            y1 = p.y - p.radius;
        }

        if ((p.y + p.radius > y2) && containedInCircles({p.x, p.y + p.radius}, circles, len)) {
            y2 = p.y + p.radius;
        }
    }

    unsigned long size = intersectionPoints->size();

    // delete intersection points
    for(int i = 0; i < size; i ++) {
        delete (*intersectionPoints)[i];
    }

    delete intersectionPoints;

    // filtered points were from intersection points
    // just delete obj
    delete filtered;

    Rectangle out = {x1, y1, x2 - x1, y2 - y1};
    return out;
};

#endif