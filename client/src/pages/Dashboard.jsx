import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import CodingPractice from "../components/CodingPractice";

import SpeechInterview from "../components/SpeechInterview";

import WebcamAnalysis from "../components/WebcamAnalysis";

import "../styles/Dashboard.css";

const Dashboard = () => {

  // USER DATA
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // STATES
  const [resume, setResume] = useState(null);

  const [resumeUploaded, setResumeUploaded] =
    useState(false);

  const [role, setRole] = useState("");

  const [company, setCompany] = useState("");

  const [questions, setQuestions] = useState([]);

  const [skills, setSkills] = useState([]);

  // PERFORMANCE TRACKING STATE
  const [performance, setPerformance] =
    useState({

      questionsAnswered: 0,

      codingSolved: 0,

      communicationScore: 0,

      technicalScore: 0,
    });

  // HANDLE FILE CHANGE
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setResume(file);
  };

  // HANDLE RESUME UPLOAD
  const handleSubmit = async (e) => {

    e.preventDefault();

    // CHECK RESUME
    if (!resume) {

      toast.error(
        "Please upload a resume"
      );

      return;
    }

    // CHECK USER
    if (!user || !user.email) {

      toast.error(
        "Please login again"
      );

      return;
    }

    try {

      // FORM DATA
      const formData = new FormData();

      formData.append(
        "resume",
        resume
      );

      formData.append(
        "email",
        user.email
      );

      // API CALL
      const response = await fetch(
        "http://127.0.0.1:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      // SUCCESS
      if (response.ok) {

        toast.success(
          data.message
        );

        setResumeUploaded(true);

      } else {

        toast.error(
          data.message ||
          "Upload Failed"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Resume Upload Failed"
      );
    }
  };

  // ANALYZE SKILLS
  const analyzeResumeSkills = () => {

    // CHECK RESUME
    if (!resumeUploaded) {

      toast.error(
        "Please upload resume first"
      );

      return;
    }

    // CHECK ROLE
    if (!role) {

      toast.error(
        "Please enter role"
      );

      return;
    }

    let requiredSkills = [];

    // SOFTWARE ENGINEER
    if (
      role.toLowerCase().includes(
        "software"
      )
    ) {

      requiredSkills = [

        "Data Structures & Algorithms",

        "React.js",

        "Node.js",

        "MongoDB",

        "DBMS",

        "Operating Systems",

        "System Design",

        "Problem Solving",
      ];
    }

    // AIML ENGINEER
    else if (

      role.toLowerCase().includes("ai") ||

      role.toLowerCase().includes("ml")

    ) {

      requiredSkills = [

        "Python",

        "Machine Learning",

        "Deep Learning",

        "TensorFlow",

        "PyTorch",

        "NLP",

        "Prompt Engineering",
      ];
    }

    // DATA SCIENCE
    else if (
      role.toLowerCase().includes(
        "data"
      )
    ) {

      requiredSkills = [

        "Python",

        "Pandas",

        "NumPy",

        "SQL",

        "Statistics",

        "Machine Learning",

        "Data Visualization",
      ];
    }

    // DEFAULT
    else {

      requiredSkills = [

        "Communication Skills",

        "Technical Knowledge",

        "Problem Solving",

        "Team Collaboration",
      ];
    }

    setSkills(requiredSkills);

    toast.success(
      "Required Skills Generated"
    );
  };

  // GENERATE AI QUESTIONS
  const generateQuestions = () => {

    // CHECK RESUME
    if (!resumeUploaded) {

      toast.error(
        "Please upload resume first"
      );

      return;
    }

    // CHECK ROLE + COMPANY
    if (!role || !company) {

      toast.error(
        "Please enter role and company name"
      );

      return;
    }

    // AI QUESTIONS
    const generatedQuestions = [

      `Tell me about yourself for the ${role} role at ${company}.`,

      `Why do you want to join ${company}?`,

      `Explain one project from your resume.`,

      `What are your strengths and weaknesses?`,

      `Why should we hire you for the ${role} role?`,

      `What technologies are you comfortable with?`,

      `Explain a difficult problem you solved.`,

      `Where do you see yourself in 5 years?`,

      `Why are you interested in ${company}?`,

      `What makes you suitable for the ${role} position?`,
    ];

    setQuestions(
      generatedQuestions
    );

    toast.success(
      "AI Questions Generated"
    );
  };

  // PERFORMANCE TRACKING
  const updatePerformance = () => {

    setPerformance({

      questionsAnswered:
        questions.length,

      codingSolved: 5,

      communicationScore: 85,

      technicalScore: 80,
    });

    toast.success(
      "Performance Updated"
    );
  };

  return (

    <div className="dashboard-container">

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <div className="dashboard-card">

        {/* TITLE */}
        <h1>
          Interview Dashboard
        </h1>

        {/* WELCOME */}
        <h2>
          Welcome!,
          {" "}
          {user?.fullName || "User"}
        </h2>

        {/* UPLOAD */}
        <p className="upload-text">
          Upload Your Resume
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          <button type="submit">
            Upload Resume
          </button>

        </form>

        {/* ROLE */}
        <input
          type="text"
          placeholder="Enter Role (Example: Software Engineer)"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="dashboard-input"
        />

        {/* COMPANY */}
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="dashboard-input"
        />

        {/* SKILLS BUTTON */}
        <button
          className="generate-btn"
          onClick={analyzeResumeSkills}
        >
          Get Required Skills
        </button>

        {/* SKILLS */}
        {
          skills.length > 0 && (

            <div className="questions-box">

              <h3>
                Required Skills
              </h3>

              <ul>

                {
                  skills.map(
                    (
                      skill,
                      index
                    ) => (

                      <li key={index}>
                        {skill}
                      </li>
                    )
                  )
                }

              </ul>

            </div>
          )
        }

        {/* QUESTIONS BUTTON */}
        <button
          className="generate-btn"
          onClick={generateQuestions}
        >
          Generate Questions
        </button>

        {/* QUESTIONS */}
        {
          questions.length > 0 && (

            <div className="questions-box">

              <h3>
                Interview Questions
              </h3>

              <ul>

                {
                  questions.map(
                    (
                      question,
                      index
                    ) => (

                      <li key={index}>
                        {question}
                      </li>
                    )
                  )
                }

              </ul>

            </div>
          )
        }

        {/* PERFORMANCE BUTTON */}
        <button
          className="generate-btn"
          onClick={updatePerformance}
        >
          Track Performance
        </button>

        {/* PERFORMANCE TRACKING */}
        <div className="questions-box">

          <h3>
            Performance Tracking
          </h3>

          <ul>

            <li>
              Questions Answered:
              {" "}
              {
                performance.questionsAnswered
              }
            </li>

            <li>
              Coding Problems Solved:
              {" "}
              {
                performance.codingSolved
              }
            </li>

            <li>
              Communication Score:
              {" "}
              {
                performance.communicationScore
              }%
            </li>

            <li>
              Technical Score:
              {" "}
              {
                performance.technicalScore
              }%
            </li>

          </ul>

        </div>

        {/* SPEECH INTERVIEW */}
        {
          questions.length > 0 && (

            <SpeechInterview
              questions={questions}
            />

          )
        }

        {/* CODING PRACTICE */}
        {
          role &&
          company && (

            <CodingPractice
              role={role}
              company={company}
            />

          )
        }

        {/* WEBCAM ANALYSIS */}
        <WebcamAnalysis />

      </div>

    </div>
  );
};

export default Dashboard;
