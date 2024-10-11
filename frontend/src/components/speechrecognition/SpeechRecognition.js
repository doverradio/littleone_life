import React, { useState, useEffect } from "react";

const SpeechRecognitionComponent = ({ animateBead }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition. Please use Google Chrome or Microsoft Edge.");
    return <div>Speech Recognition is not supported in your browser.</div>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  // Debugging: Check if the microphone is starting and stopping correctly
  recognition.onstart = () => {
    console.log("Speech recognition started.");
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
    if (listening) recognition.start(); // Automatically restart recognition if the user is still praying
  };

  const handleStartListening = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1][0].transcript;
      setTranscript(lastResult);
      console.log("Recognized:", lastResult);

      // After recognition, handle prayer completion
      handlePrayerCompletion(lastResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error); // Debugging the error
      setError(event.error);
      recognition.stop();
      setListening(false);
    };
  };

  const handlePrayerCompletion = (transcript) => {
    if (transcript.toLowerCase().includes("our father")) {
      animateBead('our-father');
    } else if (transcript.toLowerCase().includes("hail mary")) {
      animateBead('hail-mary');
    }
    setTranscript(""); // Clear transcript after each prayer
  };

  const handleStopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div>
      <h3>Begin Praying the Rosary</h3>
      <button onClick={handleStartListening} disabled={listening}>
        Begin Praying
      </button>
      <button onClick={handleStopListening} disabled={!listening}>
        Stop Praying
      </button>
      {error && <p>Error: {error}</p>}
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
