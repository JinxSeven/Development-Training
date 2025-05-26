#include <bits/stdc++.h>

int main() {
  bool startReading = false;
  std::string str = "sdfghjk8dfghj5erfgbnm";
  for (char ch : str) {
    if (!std::isalpha(ch)) {
      startReading = !startReading;
      continue;
    }
    if (startReading) {
      std::cout << ch;
    }
  }
  
  std::cout << std::endl;
}
