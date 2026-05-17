import React, {
  useState,
} from "react";

import "../styles/CodingPractice.css";

const CodingPractice = ({
  role,
  company,
}) => {

  // ====================================
  // STATES
  // ====================================

  const [
    selectedQuestion,
    setSelectedQuestion,
  ] = useState("");

  const [language, setLanguage] =
    useState("JavaScript");

  const [code, setCode] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [feedback, setFeedback] =
    useState("");


  // ====================================
  // STATIC CODING QUESTIONS
  // ====================================

  const codingQuestions = [

    `${company}: Reverse a String`,

    `${company}: Palindrome String`,

    `${company}: Fibonacci Series`,

    `${company}: Find Largest Element in Array`,

    `${company}: Two Sum Problem`,

    `${company}: Balanced Brackets`,

    `${company}: Sort Array without sort()`,

    `${company}: Find Duplicate Elements`,
  ];


  // ====================================
  // RUN CODE
  // ====================================

  const runCode = () => {

    if (!code) {

      setOutput(
        "Please write code first."
      );

      return;
    }

    let sampleOutput = "";

    if (
      language === "JavaScript"
    ) {

      sampleOutput =
        "JavaScript Code Executed Successfully";

    }

    else if (
      language === "Python"
    ) {

      sampleOutput =
        "Python Code Executed Successfully";

    }

    else if (
      language === "Java"
    ) {

      sampleOutput =
        "Java Code Executed Successfully";

    }

    else if (
      language === "C"
    ) {

      sampleOutput =
        "C Code Executed Successfully";

    }

    else if (
      language === "C++"
    ) {

      sampleOutput =
        "C++ Code Executed Successfully";

    }

    setOutput(sampleOutput);
  };


  // ====================================
  // NORMAL FEEDBACK
  // ====================================

  const generateFeedback = () => {

    if (!code) {

      setFeedback(
        "Please write code first."
      );

      return;
    }

    setFeedback(`

✔ Code logic is good

✔ Syntax looks correct

✔ Readability is clean

⚠ Improve optimization

⚠ Handle edge cases properly

⭐ Overall Score: 8/10

`);
  };


  return (

    <div className="coding-container">

      <h2>
        Coding Practice
      </h2>

      {/* QUESTION SELECT */}
      <select
        onChange={(e) =>
          setSelectedQuestion(
            e.target.value
          )
        }
      >

        <option value="">
          Select Coding Question
        </option>

        {
          codingQuestions.map(
            (
              question,
              index
            ) => (

              <option
                key={index}
                value={question}
              >
                {question}
              </option>
            )
          )
        }

      </select>

      {/* QUESTION DISPLAY */}
      {
        selectedQuestion && (

          <div className="question-box">

            <h3>
              Coding Question
            </h3>

            <p>
              {selectedQuestion}
            </p>

          </div>
        )
      }

      {/* LANGUAGE SELECT */}
      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
      >

        <option value="C">
          C
        </option>

        <option value="C++">
          C++
        </option>

        <option value="Java">
          Java
        </option>

        <option value="Python">
          Python
        </option>

        <option value="JavaScript">
          JavaScript
        </option>

      </select>

      {/* CODE AREA */}
      <textarea
        placeholder={`Write your ${language} code here...`}
        value={code}
        onChange={(e) =>
          setCode(e.target.value)
        }
      />

      {/* BUTTONS */}
      <div className="btn-group">

        <button onClick={runCode}>
          Run Code
        </button>

        <button
          onClick={
            generateFeedback
          }
        >
          Get Feedback
        </button>

      </div>

      {/* OUTPUT */}
      {
        output && (

          <div className="output-box">

            <h3>
              Code Output
            </h3>

            <pre>
              {output}
            </pre>

          </div>
        )
      }

      {/* FEEDBACK */}
      {
        feedback && (

          <div className="feedback-box">

            <h3>
              Feedback
            </h3>

            <pre>
              {feedback}
            </pre>

          </div>
        )
      }

    </div>
  );
};

export default CodingPractice;
