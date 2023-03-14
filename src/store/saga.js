import { all } from 'redux-saga/effects';
import gameInitSaga from '../../src/store/saga/gameInit';
import gameSaga from '../../src/store/saga/game.saga';

export default function* rootSaga() {
  yield all([gameInitSaga(), gameSaga()]);
}