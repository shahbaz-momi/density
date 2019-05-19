#ifndef DENSITYCOMPUTE_COMMS_HPP
#define DENSITYCOMPUTE_COMMS_HPP

class Socket {
public:
    int socket_connect();
    int socket_send(const char* buffer, int len);
    int socket_close();

private:
};

int do_comms_in();

#endif //DENSITYCOMPUTE_COMMS_HPP
