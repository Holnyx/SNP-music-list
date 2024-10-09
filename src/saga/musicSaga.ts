import { all, call, put, takeEvery } from 'redux-saga/effects';
import { MusicItem } from '@/store/types';
import {
  ADD_MUSIC_REQUEST,
  GET_ALL_MUSIC_REQUEST,
  UPDATE_MUSIC_REQUEST,
  DELETE_MUSIC_REQUEST,
  AddMusicRequest,
  addMusicSuccessAC,
  addMusicFailureAC,
  getAllMusicSuccessAC,
  getAllMusicFailureAC,
  UpdateMusicRequest,
  updateMusicSuccessAC,
  updateMusicFailureAC,
  DeleteMusicRequest,
  deleteMusicSuccessAC,
  deleteMusicFailureAC,
} from '@/store/actions';
import api from '@/api/api';

function* addMusicSaga(action: AddMusicRequest) {
  try {
    console.log('Adding music...', action.payload);
    const newMusic: MusicItem = yield call(api.addMusic, action.payload);
    yield put(addMusicSuccessAC(newMusic));
  } catch (error) {
    console.error(error);
    yield put(
      addMusicFailureAC(
        error instanceof Error ? error.message : 'Unknown error'
      )
    );
  }
}

function* getAllMusicSaga() {
  try {
    const music: MusicItem[] = yield call(api.getAllMusic);
    yield put(getAllMusicSuccessAC(music));
    console.log('Music:', music);
  } catch (error) {
    console.error(error);
    yield put(
      getAllMusicFailureAC(
        error instanceof Error ? error.message : 'Unknown error'
      )
    );
  }
}

function* updateMusicSaga(action: UpdateMusicRequest) {
  try {
    console.log('updateMusicSaga', action.payload);
    const updatedMusic: MusicItem = yield call(
      api.updateMusic,
      action.payload.id,
      action.payload.updatedMusic
    );
    yield put(updateMusicSuccessAC(updatedMusic));
  } catch (error) {
    console.error(error);
    yield put(
      updateMusicFailureAC(
        error instanceof Error ? error.message : 'Unknown error'
      )
    );
  }
}

function* deleteMusicSaga(action: DeleteMusicRequest) {
  try {
    console.log('deleteMusicSaga:', action.payload);
    yield call(api.deleteMusic, action.payload);
    yield put(deleteMusicSuccessAC(action.payload));
  } catch (error) {
    console.error(error);
    yield put(
      deleteMusicFailureAC(
        error instanceof Error ? error.message : 'Unknown error'
      )
    );
  }
}

function* watchAddMusic() {
  yield takeEvery(ADD_MUSIC_REQUEST, addMusicSaga);
  yield takeEvery(GET_ALL_MUSIC_REQUEST, getAllMusicSaga);
  yield takeEvery(UPDATE_MUSIC_REQUEST, updateMusicSaga);
  yield takeEvery(DELETE_MUSIC_REQUEST, deleteMusicSaga);
}

export default function* rootSaga() {
  yield all([watchAddMusic()]);
}
