import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";

import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMERS,
  GET_CUSTOMERS,
} from "./types";

import * as customerActions from "./actions";

import api from "../../api";

// CREATE
function* createCustomerApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/customer/create",
        { customer: payload.customer },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(
      customerActions.createCustomerSuccess(
        data.customer,
        payload.isCustomerCommingFromTaskForm
      )
    );
  } catch (error) {
    yield put(customerActions.actionFailed());
  }
}

// MASSIVE CREATE
function* createCustomersApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/customer/massive",
        { customers: payload.customers },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(customerActions.createCustomersSuccess());
    yield put(customerActions.getCustomers());
  } catch (error) {
    yield put(customerActions.actionFailed());
  }
}

function* updateCustomerApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/customer/${payload.id}`,
        { customer: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(customerActions.updateCustomerSuccess(data.customer));
  } catch (error) {
    yield put(customerActions.actionFailed());
  }
}
function* deleteCustomersApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/customer/delete`, {
        headers: { "x-handle-request": true },
        data: { ids: payload },
      })
    );

    yield put(customerActions.deleteCustomerSucess(payload));
  } catch (error) {
    yield put(customerActions.actionFailed(error));
  }
}

function* getCustomerList({ payload }) {
  try {
    const { data } = yield call(() =>
      api.get("/customer/list", { headers: { "x-handle-request": true } })
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

    yield put(customerActions.getCustomersSuccess(finalData));
  } catch (error) {
    yield put(customerActions.actionFailed());
  }
}

export function* createCustomer() {
  yield takeEvery(CREATE_CUSTOMER, createCustomerApi);
}
export function* createCustomers() {
  yield takeEvery(CREATE_CUSTOMERS, createCustomersApi);
}
export function* updateCustomer() {
  yield takeEvery(UPDATE_CUSTOMER, updateCustomerApi);
}
export function* deleteCustomers() {
  yield takeEvery(DELETE_CUSTOMERS, deleteCustomersApi);
}
export function* getCustomers() {
  yield takeEvery(GET_CUSTOMERS, getCustomerList);
}

/**
 * Customer Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createCustomer),
    fork(createCustomers),
    fork(updateCustomer),
    fork(deleteCustomers),
    fork(getCustomers),
  ]);
}
