import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data } from '../../assets/Assets/data';

const Quiz = () => {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [index, setIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1); 
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timer, setTimer] = useState(0); 
  const [intervalId, setIntervalId] = useState(null);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    const id = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (questionsAnswered === 10) {
      setResult(true);
      clearInterval(intervalId);
    }
  }, [questionsAnswered]);

  const selectRandomQuestion = () => {
    let randomIndex = getRandomNumber(0, data.length - 1);
    while (randomIndex === index || data[randomIndex].asked) {
      randomIndex = getRandomNumber(0, data.length - 1);
    }
    return randomIndex;
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
      setQuestionsAnswered(prev => prev + 1);
    }
  };

  const next = () => {
    if (lock) {
      const randomIndex = selectRandomQuestion();
      if (randomIndex === null) {
        setResult(true);
        clearInterval(intervalId); 
      } else {
        setIndex(randomIndex);
        setQuestion(data[randomIndex]);
        setLock(false);
        optionArray.forEach(option => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
        setQuestionNumber(prevNumber => prevNumber + 1); 
      }
    }
  };

  const reset = () => {
    const randomIndex = selectRandomQuestion();
    setIndex(randomIndex);
    setQuestion(data[randomIndex]);
    setScore(0);
    setLock(false);
    setResult(false);
    setQuestionsAnswered(0);
    setTimer(0); 
    setQuestionNumber(1);
    data.forEach((question, index) => {
      data[index].asked = false;
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>You Scored {score} out of 10</h2>
          <p>Total time taken: {timer} seconds</p>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{questionNumber}.{question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{questionNumber} of 10 questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
