import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion } from '../../src/store/slices/quiz.slice';
import { finishGame } from '../../src/store/slices/gameState.slice';
import Button from '../../src/components/Button';

const GamePage = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(120);
  const questions = useSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const question = questions[currentQuestionIndex]?.question;
  const score = useSelector((state) => state.quiz.score);
  const currentIndex = currentQuestionIndex + 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const answerHandler = (answer) => {
    dispatch(answerQuestion({ answer }));
  };

  const restartHandler = () => {
    dispatch(finishGame());
  };

  return (
    <>
      <div className='flex flex-col items-center relative'>
        <p className='h-20 w-20 flex justify-center items-center border-8 border-purple-500 rounded-full my-4 text-3xl text-purple-500'>
          {timeLeft}
        </p>
        <p className='absolute top-4 left-4 text-2xl text-purple-500'>
          {score}
        </p>
        <p className='absolute top-4 right-4 text-2xl text-purple-500'>
          {currentIndex}/10
        </p>
        {question && (
          <p
            dangerouslySetInnerHTML={{ __html: question }}
            className='p-7 bg-white rounded shadow '
          ></p>
        )}
        <div className='flex justify-between w-96 mt-8'>
          <Button onClick={() => answerHandler('True')}>True</Button>
          <Button onClick={() => answerHandler('False')}>False</Button>
        </div>
      </div>
      <div className='absolute bottom-4 right-4'>
        <Button onClick={restartHandler} type='error'>
          Quit Game
        </Button>
      </div>
    </>
  );
};

export default GamePage;