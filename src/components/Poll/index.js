import React, { useState, useEffect } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Poll.css';

function Poll() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoverText, setHoverText] = useState(""); // State to handle hover text
  const [responses, setResponses] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const questions = [
    {
      title: "How was your week overall?",
      options: [
        { label: "Good", icon: <ThumbUpIcon />, hoverText: "Good Week" },
        { label: "Neutral", icon: <SentimentNeutralIcon />, hoverText: "Neutral Week" },
        { label: "Bad", icon: <ThumbDownIcon />, hoverText: "Bad Week" }
      ]
    },
    {
      title: "How was the workload?",
      options: [
        { label: "Manageable", icon: <SentimentSatisfiedIcon />, hoverText: "Workload Manageable" },
        { label: "Heavy", icon: <SentimentDissatisfiedIcon />, hoverText: "Workload Heavy" },
        { label: "Light", icon: <SentimentSatisfiedIcon />, hoverText: "Workload Light" }
      ]
    },
    {
      title: "Was it exaughsting?",
      options: [
        { label: "Manageable", icon: "😌", hoverText: "Workload Manageable" },
        { label: "Heavy", icon: "😖", hoverText: "Workload Heavy" },
        { label: "Light", icon: "😊", hoverText: "Workload Light" }
      ]
    },
    {
      title: "How are things going on this project?",
      options: [
        { label: "Manageable", icon: "😌", hoverText: "Workload Manageable" },
        { label: "Heavy", icon: "😖", hoverText: "Workload Heavy" },
        { label: "Light", icon: "😊", hoverText: "Workload Light" }
      ]
    }
  ];

  const handleSelect = (option, questionTitle) => {
    setResponses(prev => ({ ...prev, [questionTitle]: option }));
    if (activeStep + 1 < questions.length) {
      setActiveStep(activeStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setResponses({});
    setActiveStep(0);
    setShowSummary(false);
  };

  useEffect(() => {
    if (showSummary) {
      submitResponses(responses);
    }
  }, [showSummary]);

  const submitResponses = async (responses) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responses)
      });
      const data = await response.json();
      console.log('Submission successful:', data);
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  return (
    <div className="poll-container">
      {!showSummary ? (
        <>
          <div className="left-panel">
            <div className="navigation-dots">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === activeStep ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                ></div>
              ))}
            </div>
            <div className="question-title">{questions[activeStep].title}</div>
          </div>
          <div className="right-panel">
            {questions[activeStep].options.map((option, i) => (
              <span
                key={i}
                onClick={() => handleSelect(option.label, questions[activeStep].title)} 
                className="option"
                onMouseEnter={() => setHoverText(option.hoverText)} 
                onMouseLeave={() => setHoverText("")} 
              >
                <IconButton>
                  {option.icon}
                </IconButton>
                {option.label}
              </span>
            ))}
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
              {hoverText}
            </Typography>
          </div>
        </>) : (
        <div className="summary">
          <Typography variant="h4" component="h2" gutterBottom>
            Summary of your responses:
          </Typography>
          <ul>
            {Object.entries(responses).map(([question, response], index) => (
              <li key={index}>{question}: {response}</li>
            ))}
          </ul>
          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Poll;
