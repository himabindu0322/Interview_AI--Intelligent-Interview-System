import React, { useState, useRef, useEffect } from "react";

import "../components/SpeechInterview.css";

const SpeechInterview = ({ questions }) => {

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [transcript, setTranscript] =
    useState("");

  const [listening, setListening] =
    useState(false);

  const [feedback, setFeedback] =
    useState("");

  const recognitionRef = useRef(null);

  // SPEECH RECOGNITION SETUP
  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    // CHECK SUPPORT
    if (!SpeechRecognition) {

      alert(
        "Speech Recognition is not supported in this browser. Please use Google Chrome."
      );

      return;
    }

    // CREATE OBJECT
    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    // RESULT EVENT
    recognition.onresult = (event) => {

      let finalTranscript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        finalTranscript +=
          event.results[i][0].transcript + " ";
      }

      setTranscript(finalTranscript);
    };

    // STOP EVENT
    recognition.onend = () => {

      setListening(false);
    };

    recognition.onerror = (event) => {

      console.log(
        "Speech Recognition Error:",
        event.error
      );

      alert(
        "Microphone access denied or not working."
      );

      setListening(false);
    };

    recognitionRef.current = recognition;

  }, []);

  // START LISTENING
  const startListening = async () => {

    try {

      // ASK MIC PERMISSION
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setListening(true);

      recognitionRef.current.start();

    } catch (error) {

      console.log(error);

      alert(
        "Please allow microphone permission."
      );
    }
  };

  // STOP LISTENING
  const stopListening = () => {

    recognitionRef.current.stop();

    setListening(false);
  };

  // CLEAR ANSWER
  const clearTranscript = () => {

    setTranscript("");
  };

  // NEXT QUESTION
  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setTranscript("");

      setFeedback("");
    }
  };

  // AI FEEDBACK
  const generateFeedback = () => {

    if (!transcript) {

      setFeedback(
        "Please answer the question first."
      );

      return;
    }

    let result = "";

    if (transcript.length < 80) {

      result =
        "Your answer is too short. Try explaining in more detail.";
    }

    else if (
      transcript.toLowerCase().includes("project")
    ) {

      result =
        "Good answer. You explained your project experience clearly.";
    }

    else {

      result =
        "Good communication skills. Try adding more technical details and confidence.";
    }

    setFeedback(result);
  };

  return (

    <div className="speech-container">

      <h2>
        AI Voice Interview
      </h2>

      {/* QUESTION */}
      {
        questions &&
        questions.length > 0 && (

          <div className="question-box">

            <h3>
              Question {currentQuestion + 1}
            </h3>

            <p>
              {
                questions[currentQuestion]
              }
            </p>

          </div>
        )
      }

      {/* STATUS */}
      <p className="status">

        {
          listening
            ? "🎤 Listening..."
            : "🎤 Microphone Stopped"
        }

      </p>

      {/* BUTTONS */}
      <div className="speech-buttons">

        <button
          className="start-btn"
          onClick={startListening}
        >
          Start Speaking
        </button>

        <button
          className="stop-btn"
          onClick={stopListening}
        >
          Stop
        </button>

        <button
          className="clear-btn"
          onClick={clearTranscript}
        >
          Clear
        </button>

        <button
          className="feedback-btn"
          onClick={generateFeedback}
        >
          Feedback
        </button>

        <button
          className="next-btn"
          onClick={nextQuestion}
        >
          Next Question
        </button>

      </div>

      {/* USER ANSWER */}
      <div className="transcript-box">

        <h3>
          Your Answer
        </h3>

        <p>
          {
            transcript ||
            "Start speaking..."
          }
        </p>

      </div>

      {/* FEEDBACK */}
      {
        feedback && (

          <div className="feedback-box">

            <h3>
              AI Feedback
            </h3>

            <p>
              {feedback}
            </p>

          </div>
        )
      }

    </div>
  );
};

export default SpeechInterview;
