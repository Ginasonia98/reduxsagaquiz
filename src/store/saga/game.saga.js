import { take, race, delay, put } from 'redux-saga/effects';
import {
  fetchQuestionsSuccess,
  answerQuestion,
  nextQuestion,
} from '../slices/quiz.slice';
import { finishGame } from '../slices/gameState.slice';

function* answersSaga() {
  for (let i = 0; i < 10; i++) {
    // Wait for an ANSWER_QUESTION action to be dispatched
    yield take(answerQuestion.type);
    // Dispatch the NEXT_QUESTION action
    yield put(nextQuestion());
  }
}

export default function* gameSaga() {
  while (true) {
    // Wait for a FETCH_QUESTIONS_SUCCESS action to be dispatched
    yield take(fetchQuestionsSuccess.type);

    // Wait for either a 60-second delay or for the answersSaga to complete
    yield race({
      delay: delay(60000),
      done: answersSaga(),
    });

    // Dispatch the FINISH_GAME action
    yield put(finishGame());
  }
}
