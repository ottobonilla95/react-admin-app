import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_TASK,
  CREATE_TASKS,
  UPDATE_TASK,
  DELETE_TASKS,
  GET_TASKS,
} from "./types";

import * as taskActions from "./actions";

import api from "../../api";

function* createTaskApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/task/create",
        { task: payload.task },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(taskActions.createTaskSuccess(data.task));
  } catch (error) {
    yield put(taskActions.actionFailed(error));
  }
}

// MASSIVE CREATE
function* createTasksApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/task/massive",
        { tasks: payload.tasks },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(taskActions.createTasksSuccess());
    yield put(taskActions.getTasks());
  } catch (error) {
    yield put(taskActions.actionFailed());
  }
}

function* updateTaskApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/task/${payload.id}`,
        { task: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(taskActions.updateTaskSuccess(data.task));
  } catch (error) {
    yield put(taskActions.actionFailed(error));
  }
}
function* deleteTasksApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/task/delete`, {
        headers: { "x-handle-request": true },
        data: { ids: payload },
      })
    );

    yield put(taskActions.deleteTaskSucess(payload));
  } catch (error) {
    yield put(taskActions.actionFailed(error));
  }
}

function* getTaskList({ payload }) {
  try {
    const { data } = yield call(() =>
      api.get("/task/list", { headers: { "x-handle-request": true } })
    );

    let finalData = {
      items: data,
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPages: 1,
        totalItems: 150,
      },
    };

    yield put(taskActions.getTasksSuccess(finalData));
  } catch (error) {
    yield put(taskActions.actionFailed(error));
  }
}

export function* createTask() {
  yield takeEvery(CREATE_TASK, createTaskApi);
}
export function* createTasks() {
  yield takeEvery(CREATE_TASKS, createTasksApi);
}
export function* updateTask() {
  yield takeEvery(UPDATE_TASK, updateTaskApi);
}
export function* deleteTasks() {
  yield takeEvery(DELETE_TASKS, deleteTasksApi);
}
export function* getTasks() {
  yield takeEvery(GET_TASKS, getTaskList);
}

/**
 * Task Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createTask),
    fork(createTasks),
    fork(updateTask),
    fork(deleteTasks),
    fork(getTasks),
  ]);
}
