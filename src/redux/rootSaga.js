import { all } from "redux-saga/effects";

// sagas
import authSagas from "./auth/saga";
import customerSagas from "./customer/saga";
import agentSagas from "./agent/saga";
import productSagas from "./product/saga";
import taskSagas from "./task/saga";
import planogramSagas from "./planogram/saga";
import settingSagas from "./settings/saga";
import userSagas from "./admin/saga";
import companySagas from "./company/saga";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    customerSagas(),
    agentSagas(),
    productSagas(),
    taskSagas(),
    planogramSagas(),
    settingSagas(),
    userSagas(),
    companySagas(),
  ]);
}
