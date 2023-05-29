
using System;
using System.Text;
using System.Collections.Generic;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;
    private static readonly string NOT_POSSIBLE_REARRANGEMENT = "";

    public string ReorganizeString(string input)
    {
        var letterFrequency = new int[ALPHABET_SIZE];
        for (int i = 0; i < input.Length; ++i)
        {
            ++letterFrequency[input[i] - 'a'];
        }

        var maxHeap = new PriorityQueue<char, int>(Comparer<int>.Create((x, y) => y - x));
        for (int i = 0; i < ALPHABET_SIZE; ++i)
        {
            if (letterFrequency[i] > 0)
            {
                maxHeap.Enqueue((char)('a' + i), letterFrequency[i]);
            }
        }


        StringBuilder result = new StringBuilder();
        while (maxHeap.Count > 1)
        {
            maxHeap.TryDequeue(out var firstLetter, out var firstFrequency);
            maxHeap.TryDequeue(out var secondLetter, out var secondFrequency);
            result.Append(firstLetter).Append(secondLetter);

            if (--firstFrequency > 0)
            {
                maxHeap.Enqueue(firstLetter, firstFrequency);
            }
            if (--secondFrequency > 0)
            {
                maxHeap.Enqueue(secondLetter, secondFrequency);
            }
        }

        if (maxHeap.Count == 0)
        {
            return result.ToString();
        }
        maxHeap.TryPeek(out var letter, out var frequency);
        if (frequency - 1 == 0)
        {
            return result.Append(letter).ToString();
        }
        return NOT_POSSIBLE_REARRANGEMENT;
    }
}
