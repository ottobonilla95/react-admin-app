import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  GET_COMPANYS,
  GET_COMPANY,
} from "./types";

import * as companyActions from "./actions";

import api from "../../api";

import history from "../../utils/history";

// CREATE
function* createCompanyApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/company/",
        { company: payload.company },
        { headers: { "x-handle-request": true } }
      )
    );
    history.push("/app/company");
    yield put(companyActions.createCompanySuccess(data.company));
  } catch (error) {
    yield put(companyActions.actionFailed());
  }
}

function* updateCompanyApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/company/${payload.id}`,
        { company: payload },
        { headers: { "x-handle-request": true } }
      )
    );
    history.push("/app/company");
    yield put(companyActions.updateCompanySuccess(data.company));
  } catch (error) {
    yield put(companyActions.actionFailed());
  }
}

function* deleteCompanyApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/company/${payload}`, {
        headers: { "x-handle-request": true },
      })
    );

    yield put(companyActions.deleteCompanySucess(payload));
  } catch (error) {
    yield put(companyActions.actionFailed(error));
  }
}

function* getCompanyList({ payload }) {
  try {
    const { data } = yield call(() =>
      api.get("/company/", { headers: { "x-handle-request": true } })
    );

    let finalData = {
      items: data.companies,
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        numberOfPages: 1,
        totalItems: 150,
      },
    };

    yield put(companyActions.getCompanysSuccess(finalData));
  } catch (error) {
    yield put(companyActions.actionFailed());
  }
}

function* getCompanyApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.get(`/company/${payload}`, { headers: { "x-handle-request": true } })
    );

    yield put(companyActions.getCompanySuccess(data.company));
  } catch (error) {
    yield put(companyActions.actionFailed());
  }
}

export function* createCompany() {
  yield takeEvery(CREATE_COMPANY, createCompanyApi);
}
export function* updateCompany() {
  yield takeEvery(UPDATE_COMPANY, updateCompanyApi);
}
export function* deleteCompany() {
  yield takeEvery(DELETE_COMPANY, deleteCompanyApi);
}
export function* getCompanys() {
  yield takeEvery(GET_COMPANYS, getCompanyList);
}
export function* getCompany() {
  yield takeEvery(GET_COMPANY, getCompanyApi);
}

/**
 * Company Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createCompany),
    fork(updateCompany),
    fork(deleteCompany),
    fork(getCompanys),
    fork(getCompany),
  ]);
}
