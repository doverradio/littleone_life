import React, { useState } from "react";

const SpeechRecognitionComponent1 = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);

  // Cross-browser SpeechRecognition support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Check for browser support
  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition. Please use Google Chrome or Microsoft Edge.");
    return <div>Speech Recognition is not supported in your browser.</div>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;  // Continuous listening
  recognition.interimResults = false;  // Final results only
  recognition.lang = "en-US";  // Set language to English

  const handleStartListening = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1][0].transcript;
      setTranscript(lastResult);
      console.log("Recognized:", lastResult);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      recognition.stop();
      setListening(false);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      setListening(false);
    };
  };

  const handleStopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div>
      <h1>Speech Recognition for Rosary Prayers</h1>
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

export default SpeechRecognitionComponent1;