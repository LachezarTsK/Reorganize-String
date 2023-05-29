
#include <queue>
#include <array>
#include <string>
using namespace std;

class Solution {
    
    static const int ALPHABET_SIZE = 26;
    inline static const string NOT_POSSIBLE_REARRANGEMENT{};

    struct CharToFrequency {
        char letter;
        int frequency;
        CharToFrequency(char letter, int frequency) : letter {letter}, frequency {frequency}{}
    };

public:
    string reorganizeString(const string& input) const {
        array<int, ALPHABET_SIZE> letterFrequency{};
        for (const auto& letter : input) {
            ++letterFrequency[letter - 'a'];
        }

        const auto compare = [](auto x, auto y) {return y.frequency > x.frequency;};
        priority_queue<CharToFrequency, vector<CharToFrequency>, decltype(compare) > maxHeap(compare);

        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (letterFrequency[i] > 0) {
                maxHeap.push(CharToFrequency((char) ('a' + i), letterFrequency[i]));
            }
        }

        string result;
        while (maxHeap.size() > 1) {

            CharToFrequency first = maxHeap.top();
            result.push_back(first.letter);
            maxHeap.pop();

            CharToFrequency second = maxHeap.top();
            result.push_back(second.letter);
            maxHeap.pop();

            if (--first.frequency > 0) {
                maxHeap.push(first);
            }
            if (--second.frequency > 0) {
                maxHeap.push(second);
            }
        }

        if (maxHeap.empty()) {
            return result;
        }
        if (maxHeap.top().frequency - 1 == 0) {
            result.push_back(maxHeap.top().letter);
            return result;
        }
        return NOT_POSSIBLE_REARRANGEMENT;
    }
};
