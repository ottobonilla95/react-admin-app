import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_PRODUCT,
  CREATE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCTS,
  GET_PRODUCTS,
} from "./types";

import * as productActions from "./actions";

import api from "../../api";

function* createProductApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/product/create",
        { product: payload.product },
        { headers: { "x-handle-request": true } }
      )
    );
    yield put(productActions.createProductSuccess(data.product));
  } catch (error) {
    yield put(productActions.actionFailed(error));
  }
}

// MASSIVE CREATE
function* createProductsApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.post(
        "/product/massive",
        { products: payload.products },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(productActions.createProductsSuccess());
    yield put(productActions.getProducts());
  } catch (error) {
    yield put(productActions.actionFailed());
  }
}

function* updateProductApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        `/product/${payload.id}`,
        { product: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    yield put(productActions.updateProductSuccess(data.product));
  } catch (error) {
    yield put(productActions.actionFailed(error));
  }
}
function* deleteProductsApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.delete(`/product/delete`, {
        headers: { "x-handle-request": true },
        data: { ids: payload },
      })
    );

    yield put(productActions.deleteProductSucess(payload));
  } catch (error) {
    yield put(productActions.actionFailed(error));
  }
}

function* getProductList({ payload }) {
  try {
    const { data } = yield call(() =>
      api.get("/product/list", { headers: { "x-handle-request": true } })
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

    yield put(productActions.getProductsSuccess(finalData));
  } catch (error) {
    yield put(productActions.actionFailed(error));
  }
}

export function* createProduct() {
  yield takeEvery(CREATE_PRODUCT, createProductApi);
}
export function* createProducts() {
  yield takeEvery(CREATE_PRODUCTS, createProductsApi);
}
export function* updateProduct() {
  yield takeEvery(UPDATE_PRODUCT, updateProductApi);
}
export function* deleteProducts() {
  yield takeEvery(DELETE_PRODUCTS, deleteProductsApi);
}
export function* getProducts() {
  yield takeEvery(GET_PRODUCTS, getProductList);
}

/**
 * Product Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createProduct),
    fork(createProducts),
    fork(updateProduct),
    fork(deleteProducts),
    fork(getProducts),
  ]);
}
