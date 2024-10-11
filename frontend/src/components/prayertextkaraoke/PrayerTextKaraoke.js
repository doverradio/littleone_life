import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './PrayerTextKaraoke.css'; // Ensure proper styling

const PrayerTextKaraoke = ({ prayerText = '', transcript }) => {
  const words = prayerText ? prayerText.split(' ') : [];
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Start with the first word

  useEffect(() => {
    if (!transcript) return;

    const transcriptWords = transcript.toLowerCase().split(' ');

    let nextIndex = highlightedIndex;

    transcriptWords.forEach((transcriptWord) => {
      if (nextIndex < words.length && words[nextIndex].toLowerCase().startsWith(transcriptWord)) {
        nextIndex += 1; // Move to the next word
      }
    });

    setHighlightedIndex(nextIndex);
  }, [transcript, words, highlightedIndex]);

  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="col-md-6">
        <div className="prayer-text-karaoke text-center">
          <div className="scroll-area-sm">
            <PerfectScrollbar>
              {words.map((word, index) => (
                <span
                  key={index}
                  style={{
                    color: index < highlightedIndex ? 'black' : index === highlightedIndex ? 'red' : 'grey',
                    textDecoration: index === highlightedIndex ? 'underline' : 'none'
                  }}
                >
                  {word}{' '}
                </span>
              ))}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTextKaraoke;
