import { all, take, fork, call, put, delay, cancel } from 'redux-saga/effects';
import { startGame, cancelFetchQuestions } from '../slices/gameState.slice';
import {
  fetchQuestionsFail,
  fetchQuestionsSuccess,
} from '../slices/quiz.slice';
import { fetchQuiz } from '../../utils/api';

function* fetchQuestionSaga() {
  try {
    // Fetch the questions from the API using the fetchQuiz function
    const data = yield call(fetchQuiz);
    // Dispatch the FETCH_QUESTIONS_SUCCESS action with the received data
    yield put(fetchQuestionsSuccess(data));
  } catch (error) {
    // Dispatch the FETCH_QUESTIONS_FAIL action with an error message
    yield put(
      fetchQuestionsFail(
        'There was an error trying to get the questions. Please refresh the page!'
      )
    );
  }
}

function* cancelFetchQuizTask() {
  // Wait for a CANCEL_FETCH_QUESTIONS action to be dispatched
  yield take(cancelFetchQuestions.type);
  // Cancel the current fetchQuestionSaga task
  yield cancel();
}

export default function* startGameSaga() {
  while (true) {
    // Wait for a START_GAME action to be dispatched
    yield take(startGame.type);
    // Fork a new fetchQuestionSaga task and store it in a variable
    const fetchQuestionTask = yield fork(fetchQuestionSaga);
    // Fork a new cancelFetchQuizTask task with the fetchQuestionTask variable as an argument
    yield fork(cancelFetchQuizTask, fetchQuestionTask);
  }
}

