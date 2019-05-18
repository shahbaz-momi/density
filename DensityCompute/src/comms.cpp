#undef UNICODE

#include <stdio.h>
#include <stdlib.h>
#include <winsock2.h>
#include <cstdint>

#pragma comment (lib, "Ws2_32.lib")

#define SOCKET_BUFF_SIZE 50000

class Comms {
public:
    void init(uint16_t port);
};

void Comms::init(uint16_t port) {
    WSADATA wsaData;
    int iResult;

    SOCKET ListenSocket = INVALID_SOCKET;
    SOCKET ClientSocket = INVALID_SOCKET;

    struct addrifno* result = nullptr;
    struct addrinfo hints;

    int iSendResult;

    char recvbuf[SOCKET_BUFF_SIZE];
    int recvbuflen = SOCKET_BUFF_SIZE;

    if(WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        
    }
}
