#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    auto v = split("1;2;3;4;5;", ";");

    for(string & s : *v) {
        cout << s << endl;
    }

    delete v;
}