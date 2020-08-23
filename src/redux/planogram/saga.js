import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";

import {
  CREATE_PLANOGRAM,
  UPDATE_PLANOGRAM,
  DELETE_PLANOGRAM,
  GET_PLANOGRAMS,
} from "./types";

import {
  createPlanogramSuccess,
  updatePlanogramSuccess,
  deletePlanogramSucess,
  getPlanogramsSuccess,
  actionFailed,
} from "./actions";

import api from "../../api";

function* createPlanogramApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/planogram/create",
        { planogram: payload.planogram },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(createPlanogramSuccess(data.planogram));
  } catch (error) {
    yield put(actionFailed());
  }
}

function* updatePlanogramApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/planogram/${payload.id}`,
        { planogram: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(updatePlanogramSuccess(data.planogram));
  } catch (error) {
    yield put(actionFailed(error));
  }
}

function* deletePlanogramApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/planogram/${payload}`, {
        headers: { "x-handle-request": true },
      })
    );

    yield put(deletePlanogramSucess(payload));
  } catch (error) {
    yield put(actionFailed(error));
  }
}

function* getPlanogramList() {
  try {
    const { data } = yield call(() =>
      api.get("/planogram/list", { headers: { "x-handle-request": true } })
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

    yield put(getPlanogramsSuccess(finalData));
  } catch (error) {
    yield put(actionFailed(error));
  }
}

export function* createPlanogram() {
  yield takeEvery(CREATE_PLANOGRAM, createPlanogramApi);
}
export function* updatePlanogram() {
  yield takeEvery(UPDATE_PLANOGRAM, updatePlanogramApi);
}
export function* deletePlanogram() {
  yield takeEvery(DELETE_PLANOGRAM, deletePlanogramApi);
}
export function* getPlanograms() {
  yield takeEvery(GET_PLANOGRAMS, getPlanogramList);
}

/**
 * Planogram Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createPlanogram),
    fork(updatePlanogram),
    fork(deletePlanogram),
    fork(getPlanograms),
  ]);
}
