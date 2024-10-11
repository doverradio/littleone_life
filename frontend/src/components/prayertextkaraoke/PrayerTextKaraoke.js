import React, { useState, useEffect } from 'react';
import './PrayerTextKaraoke.css'; // For styling the text

const PrayerTextKaraoke = ({ prayerText = '', transcript }) => {
  // Ensure prayerText is not undefined
  const words = prayerText ? prayerText.split(' ') : [];

  // State to track how many words are highlighted
  const [highlightedIndex, setHighlightedIndex] = useState(2); // Start with first two words

  useEffect(() => {
    if (!transcript) return;

    // Compare transcript to the current prayer words and update highlighting
    const transcriptWords = transcript.toLowerCase().split(' ');

    let nextIndex = highlightedIndex;

    // Loop over the transcript words and match them to the prayer words
    transcriptWords.forEach((transcriptWord) => {
      if (nextIndex < words.length && words[nextIndex].toLowerCase().startsWith(transcriptWord)) {
        nextIndex += 1; // Move to the next word
      }
    });

    // Update highlighted index if any change
    setHighlightedIndex(nextIndex);
  }, [transcript, words, highlightedIndex]);

  return (
    <div className="prayer-text-karaoke">
      {words.map((word, index) => (
        <span
          key={index}
          className={index < highlightedIndex ? 'highlighted' : 'unhighlighted'}
        >
          {word}{' '}
        </span>
      ))}
    </div>
  );
};

export default PrayerTextKaraoke;
