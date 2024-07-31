import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { RootState, AppDispatch } from '../../store';
import {
  setActiveStep,
  setHoverText,
  setResponses,
  setShowSummary,
  resetPoll,
} from '../../features/poll/pollSlice';
import './Poll.css';

interface Question {
  title: string;
  options: {
    label: string;
    icon: React.ReactNode;
    hoverText: string;
  }[];
}

const Poll: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeStep, hoverText, responses, showSummary } = useSelector(
    (state: RootState) => state.poll
  );

  const questions: Question[] = [
    {
      title: "How was your week overall?",
      options: [
        { label: "Good", icon: <ThumbUpIcon />, hoverText: "Good Week" },
        { label: "Neutral", icon: <SentimentNeutralIcon />, hoverText: "Neutral Week" },
        { label: "Bad", icon: <ThumbDownIcon />, hoverText: "Bad Week" },
      ],
    },
    {
      title: "How was the workload?",
      options: [
        { label: "Good", icon: <ThumbUpIcon />, hoverText: "Good Week" },
        { label: "Neutral", icon: <SentimentNeutralIcon />, hoverText: "Neutral Week" },
        { label: "Bad", icon: <ThumbDownIcon />, hoverText: "Bad Week" },
      ],
    },
    {
      title: "Was it exhausting?",
      options: [
        { label: "Good", icon: <ThumbUpIcon />, hoverText: "Good Week" },
        { label: "Neutral", icon: <SentimentNeutralIcon />, hoverText: "Neutral Week" },
        { label: "Bad", icon: <ThumbDownIcon />, hoverText: "Bad Week" },
      ],
    },
    {
      title: "How are things going on this project?",
      options: [
        { label: "Good", icon: <ThumbUpIcon />, hoverText: "Good Week" },
        { label: "Neutral", icon: <SentimentNeutralIcon />, hoverText: "Neutral Week" },
        { label: "Bad", icon: <ThumbDownIcon />, hoverText: "Bad Week" },
      ],
    },
  ];

  const handleSelect = (option: string, questionTitle: string) => {
    dispatch(setResponses({ [questionTitle]: option }));
    if (activeStep + 1 < questions.length) {
      dispatch(setActiveStep(activeStep + 1));
    } else {
      dispatch(setShowSummary(true));
    }
  };

  const handleRestart = () => {
    dispatch(resetPoll());
  };

  useEffect(() => {
    if (showSummary) {
      submitResponses(responses);
    }
  }, [showSummary]);

  const submitResponses = async (responses: Record<string, string>) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
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
                  onClick={() => dispatch(setActiveStep(index))}
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
                onMouseEnter={() => dispatch(setHoverText(option.hoverText))}
                onMouseLeave={() => dispatch(setHoverText(''))}
              >
                <IconButton>{option.icon}</IconButton>
                {option.label}
              </span>
            ))}
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
              {hoverText}
            </Typography>
          </div>
        </>
      ) : (
        <div className="summary">
          <Typography variant="h4" component="h2" gutterBottom>
            Summary of your responses:
          </Typography>
          <ul>
            {Object.entries(responses).map(([question, response], index) => (
              <li key={index}>
                {question}: {response}
              </li>
            ))}
          </ul>
          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Poll;
