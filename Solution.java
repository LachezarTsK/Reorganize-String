
import java.util.PriorityQueue;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final String NOT_POSSIBLE_REARRANGEMENT = "";

    /*
    The immutable class record (Java 14) not used here since the object 
    might be added again to the heap with changed in ‘frequency’.    
     */
    private class CharToFrequency {

        char letter;
        int frequency;

        CharToFrequency(char letter, int frequency) {
            this.letter = letter;
            this.frequency = frequency;
        }
    }

    public String reorganizeString(String input) {
        int[] letterFrequency = new int[ALPHABET_SIZE];
        for (int i = 0; i < input.length(); ++i) {
            ++letterFrequency[input.charAt(i) - 'a'];
        }

        PriorityQueue<CharToFrequency> maxHeap = new PriorityQueue<>((x, y) -> y.frequency - x.frequency);
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (letterFrequency[i] > 0) {
                maxHeap.add(new CharToFrequency((char) ('a' + i), letterFrequency[i]));
            }
        }

        StringBuilder result = new StringBuilder();
        while (maxHeap.size() > 1) {
            CharToFrequency first = maxHeap.poll();
            CharToFrequency second = maxHeap.poll();
            result.append(first.letter).append(second.letter);

            if (--first.frequency > 0) {
                maxHeap.add(first);
            }
            if (--second.frequency > 0) {
                maxHeap.add(second);
            }
        }

        if (maxHeap.isEmpty()) {
            return result.toString();
        }
        if (maxHeap.peek().frequency - 1 == 0) {
            return result.append(maxHeap.peek().letter).toString();
        }
        return NOT_POSSIBLE_REARRANGEMENT;
    }
}
