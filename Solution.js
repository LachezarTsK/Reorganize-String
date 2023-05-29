
/**
 * @param {string} input
 * @return {string}
 */
var reorganizeString = function (input) {
    const ALPHABET_SIZE = 26;
    const ASCII_SMALL_CASE_A = 97;
    const NOT_POSSIBLE_REARRANGEMENT = "";
    
    const letterFrequency = new Array(ALPHABET_SIZE).fill(0);
    for (let i = 0; i < input.length; ++i) {
        ++letterFrequency[input.codePointAt(i) - ASCII_SMALL_CASE_A];
    }

    //const {MaxPriorityQueue} = require('@datastructures-js/priority-queue');
    // MaxPriorityQueue<CharToFrequency>
    const maxHeap = new PriorityQueue({compare: (x, y) => y.frequency - x.frequency});
    for (let i = 0; i < ALPHABET_SIZE; ++i) {
        if (letterFrequency[i] > 0) {
            maxHeap.enqueue(new CharToFrequency(String.fromCodePoint(ASCII_SMALL_CASE_A + i), letterFrequency[i]));
        }
    }

    const result = [];
    while (maxHeap.size() > 1) {
        let first = maxHeap.dequeue();
        let second = maxHeap.dequeue();
        result.push(first.letter);
        result.push(second.letter);

        if (--first.frequency > 0) {
            maxHeap.enqueue(first);
        }
        if (--second.frequency > 0) {
            maxHeap.enqueue(second);
        }
    }

    if (maxHeap.isEmpty()) {
        return result.join('');
    }
    if (maxHeap.front().frequency - 1 === 0) {
        result.push(maxHeap.front().letter);
        return result.join('');
    }
    return NOT_POSSIBLE_REARRANGEMENT;
};

/**
 * @param {string} letter
 * @param {number[]} frequency 
 */
function CharToFrequency(letter, frequency) {
    this.letter = letter;
    this.frequency = frequency;
}
