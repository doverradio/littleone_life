import React, { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Import microphone icons
import './SpeechRecognitionComponent.css'; // Import the CSS for styling

const SpeechRecognitionComponent = ({ animateBead, updateTranscript }) => { 
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
      updateTranscript(lastResult); // Update the parent component's transcript state
      console.log("Recognized:", lastResult);

      handlePrayerCompletion(lastResult); // Call the function to animate the bead
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError(event.error);
      recognition.stop();
      setListening(false);
    };
  };

  const handlePrayerCompletion = (transcript) => {
    console.log(`Handling prayer completion for: ${transcript}`);
    if (transcript.toLowerCase().includes("our father")) {
      console.log("Our Father recognized");
      animateBead('our-father'); // Animate Our Father bead
    } else if (transcript.toLowerCase().includes("hail mary")) {
      console.log("Hail Mary recognized");
      animateBead(`hail-mary`); // Animate Hail Mary bead, will handle the index in Rosary.js
    }
    setTranscript(""); // Clear transcript after each prayer
  };

  const handleStopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div className="speech-recognition-container mt-5">
      {/* Dynamically change the text above the icon */}
      <sup>{listening ? "Stop Listening" : "Begin Praying"}</sup>
      {/* Use a microphone icon that toggles when listening */}
      <button 
        onClick={listening ? handleStopListening : handleStartListening} 
        className="microphone-button"
      >
        {listening ? <FaMicrophoneSlash className="microphone-icon" /> : <FaMicrophone className="microphone-icon" />}
      </button>
      {error && <p>Error: {error}</p>}
      {/* <p>Transcript: {transcript}</p> */}
    </div>
  );
};

export default SpeechRecognitionComponent;
