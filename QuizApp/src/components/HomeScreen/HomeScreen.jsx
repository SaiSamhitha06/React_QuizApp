import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from '../QuizComponent/Quiz';

const HomeScreen = () => {
  const startQuiz = () => {
    ReactDOM.render(<Quiz />, document.getElementById('root'));
  };

  return (
    <div className="container">
      <h1>Welcome to the Quiz App</h1>
      <p>Test your knowledge with our quiz!</p>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default HomeScreen;
