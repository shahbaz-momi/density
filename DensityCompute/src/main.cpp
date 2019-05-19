#include "triangulation.cpp"

#include "SerialPort.h"
#include "comms.hpp"
#include "rssi_estimation.hpp"

#define DEVICE_TIMEOUT 60 * 1000
#define SERIAL_BUFFER 500000
#define DISTANCE_DELTA_TOLERANCE 10.0

#include <iostream>
#include <string>
#include <vector>
#include <map>

#include <stdlib.h>

using namespace std;

typedef struct {
    double dists[5]; // distances in m
    ULONGLONG time;
} Device;

Point node_locations[5] = {
        {3.9624, 0},
        {0, 0},
        {0, 0},
        {0, 5.08},
        {0, 0}
};

Socket node_sock;

map<string, Device*> devices;
map<string, Point*> points;

vector<string*>* split(const string & in, const string & token){
    string str = in;
    auto result = new vector<string*>();
    while(str.size()){
        int index = str.find(token);
        if(index!=string::npos){
            result->push_back(new string(str.substr(0, index)));
            str = str.substr(index+token.size());
            if(str.size()==0)result->push_back(new string(str));
        }else{
            if(!str.empty())
                result->push_back(new string(str));
            str = "";
        }
    }
    return result;
}

void process1() {
    const auto now = GetTickCount64();

    // sweep out old devices
    map<string, Device*>::iterator itr = devices.begin();
    while(itr != devices.end()) {
        if(now - ((Device*) itr->second)->time > DEVICE_TIMEOUT) {
            points.erase(itr->first);
            itr = devices.erase(itr);
        } else {
            ++itr;
        }
    }

    for(const auto & i : devices) {
        auto d = (Device*) i.second;
        int zs = 0;

        for(int j = 0; j < 5; j ++) {
            if(d->dists[j] == 0.0)
                zs ++;
        }

        if(zs >= 3)
            continue;

        if(zs < 2) {
            double temp[5];
            memcpy(temp, d->dists, sizeof(temp));

            // we have more than 3 nodes picking this up
            // blank out the weakest ones
            sort(temp, temp + 5);
            // 0 out the first 2
            for(int j = 0; j < 5; j ++) {
                if(d->dists[j] == temp[0] ||
                    d->dists[j] == temp[1])
                    d->dists[j] = 0.0;
            }
        }

        // have enough data to go now
        Circle circles[3];
        int offset = 0;
        for(int j = 0; j < 5; j ++) {
            if(d->dists[j] != 0.0) {
                circles[offset].radius = d->dists[j];
                circles[offset].x = node_locations[offset].x;
                circles[offset].y = node_locations[offset].y;
            }
        }

        auto out = Triangulation::triangulate(circles);
        cout << out->x << " " << out->y << endl;
        points[i.first] = out;
    }

    auto output = new string;

    // dump the point string
    for(auto & p : points) {
        auto did = p.first;
        auto point = p.second;

            (*output) += did;
            (*output) += ",";
            (*output) += to_string(point->x);
            (*output) += ",";
            (*output) += to_string(point->y);
            (*output) += ",";
            (*output) += "0";
            (*output) += ";";
    }

    cout << *output << endl;

//    if(!output->empty())
//        node_sock.socket_send(output->c_str(), output->size());

    delete output;
}

string* partial = nullptr;

void process0(string & in) {
    const auto now = GetTickCount64();

    auto vec = split(in, ";");

    // first is channel : unneeded
    // next is node id : needed for putting in the dist
    // next is device entries
    const int node_i = stoi(*vec->at(1)) - 1; // node ids are offset by 1

    for(int i = 2; i < vec->size(); i ++) {
        auto current_device = vec->at(i);

        if(current_device->empty())
            continue;

        auto sub = split(*current_device, "#");
        // first part is the mac
        // next part is the rssi
        // last part is the num

        double avg_rssi = 0;
        const int num_vals = min(10, stoi(*sub->back()));

        for(int j = 1; j < num_vals + 1; j ++) {
            avg_rssi += stoi(*sub->at(j));
        }

        avg_rssi /= num_vals;

        double dist = RssiEstimation::rssi_to_distance(avg_rssi);

        auto mac = new string(*sub->at(0));

        if(devices.count(*mac)) {
            // already exists, update the distance at this node
            auto devp = devices[*mac];
            cout << avg_rssi << " " << devp->dists[node_i] << " " << dist << endl;
            // if the distance is too much from from the previous one,
            // then fuck it and drop it
            const auto delta = abs(devp->dists[node_i] - dist);

            if(delta <= DISTANCE_DELTA_TOLERANCE) {
                devp->dists[node_i] = devp->dists[node_i] * 0.5 + dist * 0.5;
                devp->time = now;
            }

            delete mac;
        } else {
            // put a new device object
            auto dev = new Device;
            dev->dists[0] = 0.0;
            dev->dists[1] = 0.0;
            dev->dists[2] = 0.0;
            dev->dists[3] = 0.0;
            dev->dists[4] = 0.0;

            dev->dists[node_i] = dist;
            dev->time = now;

            cout << avg_rssi << " " << dist << endl;

            devices[*mac] = dev;
            // dont delete mac cause we need it now
        }

        delete sub;
    }

    delete vec;

    process1();
}

void process(string & in) {
    // check the marking flags for partial packet data
    auto startMark = in.find('[');
    auto endMark = in.find(']');

    if(startMark != string::npos && endMark != string::npos) {
        if(startMark < endMark) {
            // do that part first
            // take that substr
            auto inner = in.substr(startMark + 1, endMark - startMark - 1);
            process0(inner);

            // end mark is the ending of the string
            if(endMark == in.size() - 1) {
                return;
            }

            // partial
            auto rest = in.substr(endMark + 1);
            process(rest);
        } else {
            // partial packets
            auto end = in.substr(0, endMark);
            *partial += end;
            process0(*partial);
            delete partial;

            auto rest = in.substr(startMark);
            process(rest);
        }
    } else if(startMark != string::npos) {
        // just contains start, not ending
        partial = new string;
        (*partial) += in.substr(startMark + 1);
    } else if(endMark != string::npos) {
        // just contains end
        (*partial) += in.substr(0, endMark);
        process0(*partial);
        delete partial;
    } else {
        (*partial) += in;
    }
}

int main() {
    // create the socket to node
    node_sock.socket_connect();

    char* com_port = "\\\\.\\COM5";

    // TODO: init serial reading

    SerialPort serial(com_port, 921600);

    char buffer[SERIAL_BUFFER];

    do {
        int len = serial.readSerialPort(buffer, SERIAL_BUFFER);
        if(len != 0) {
            auto str = new string((const char*) buffer, len);

            process(*str);

            delete str;
        }
        Sleep(100);
    } while(serial.isConnected());


    node_sock.socket_close();
}