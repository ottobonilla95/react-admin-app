import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USERS } from "./types";

import * as userActions from "./actions";

import api from "../../api";

// CREATE
function* createUserApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/admin/user",
        { user: payload.user },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(userActions.createUserSuccess(data.user));
  } catch (error) {
    yield put(userActions.actionFailed());
  }
}

function* updateUserApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/admin/user/${payload.id}`,
        { user: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(userActions.updateUserSuccess(data.user));
  } catch (error) {
    yield put(userActions.actionFailed());
  }
}

function* deleteUserApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/admin/user/${payload}`, {
        headers: { "x-handle-request": true },
      })
    );

    yield put(userActions.deleteUserSucess(payload));
  } catch (error) {
    yield put(userActions.actionFailed(error));
  }
}

function* getUserList({ payload }) {
  try {
    const { data } = yield call(() =>
      api.get("/admin/user", { headers: { "x-handle-request": true } })
    );

    let finalData = {
      items: data.users,
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPages: 1,
        totalItems: 150,
      },
    };

    yield put(userActions.getUsersSuccess(finalData));
  } catch (error) {
    yield put(userActions.actionFailed());
  }
}

export function* createUser() {
  yield takeEvery(CREATE_USER, createUserApi);
}
export function* updateUser() {
  yield takeEvery(UPDATE_USER, updateUserApi);
}
export function* deleteUser() {
  yield takeEvery(DELETE_USER, deleteUserApi);
}
export function* getUsers() {
  yield takeEvery(GET_USERS, getUserList);
}

/**
 * User Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createUser),
    fork(updateUser),
    fork(deleteUser),
    fork(getUsers),
  ]);
}
