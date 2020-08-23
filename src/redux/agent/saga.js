import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_AGENT,
  CREATE_AGENTS,
  UPDATE_AGENT,
  DELETE_AGENTS,
  GET_AGENTS,
} from "./types";

import * as agenActions from "./actions";

import api from "../../api";

function* createAgentApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/agent/create",
        { agent: payload.agent },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(agenActions.createAgentSuccess(data.agent));
  } catch (error) {
    yield put(agenActions.actionFailed());
  }
}

// MASSIVE CREATE
function* createAgentsApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/agent/massive",
        { agents: payload.agents },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(agenActions.createAgentsSuccess());
    yield put(agenActions.getAgents());
  } catch (error) {
    yield put(agenActions.actionFailed());
  }
}

function* updateAgentApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/agent/${payload.id}`,
        { agent: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(agenActions.updateAgentSuccess(data.agent));
  } catch (error) {
    yield put(agenActions.actionFailed());
  }
}
function* deleteAgentsApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/agent/delete`, {
        headers: { "x-handle-request": true },
        data: { ids: payload },
      })
    );

    yield put(agenActions.deleteAgentSucess(payload));
  } catch (error) {
    yield put(agenActions.actionFailed());
  }
}

function* getAgentList() {
  try {
    const { data } = yield call(() =>
      api.get("/agent/list", { headers: { "x-handle-request": true } })
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

    yield put(agenActions.getAgentsSuccess(finalData));
  } catch (error) {
    yield put(agenActions.actionFailed());
  }
}

export function* createAgent() {
  yield takeEvery(CREATE_AGENT, createAgentApi);
}
export function* createAgents() {
  yield takeEvery(CREATE_AGENTS, createAgentsApi);
}
export function* updateAgent() {
  yield takeEvery(UPDATE_AGENT, updateAgentApi);
}
export function* deleteAgents() {
  yield takeEvery(DELETE_AGENTS, deleteAgentsApi);
}
export function* getAgents() {
  yield takeEvery(GET_AGENTS, getAgentList);
}

/**
 * Agent Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createAgent),
    fork(createAgents),
    fork(updateAgent),
    fork(deleteAgents),
    fork(getAgents),
  ]);
}
