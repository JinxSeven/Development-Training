#include "bits/stdc++.h"

int main() {
    int ranks[] = {10, 20, 15, 5, 7};
    
    std::stack<int> stackList;
    for (int rank : ranks) {
        if (stackList.empty()) stackList.push(rank);
        else if (rank < stackList.top()) stackList.push(rank);
    }

    std::cout << stackList.size() - 1;
}