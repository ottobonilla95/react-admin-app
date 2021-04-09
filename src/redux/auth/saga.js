/**
 * Auth Sagas
 */
import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";


import api from "../../api";

import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_EMAIL,
  UPDATE_PROFILE_LANGUAGE,
  UPDATE_PROFILE_THEME,
} from "./types";

import {
  signinUserSuccess,
  signinUserFailure,
  signUpUserSuccess,
  signUpUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  updateProfileSuccess,
  updateProfileEmailSuccess,
  updateProfileLanguageSuccess,
  updateProfileThemeSuccess,
} from "./actions";

import * as adminActions from "../admin/actions";
import * as agentActions from "../agent/actions";
import * as companyActions from "../company/actions";
import * as customerActions from "../customer/actions";
import * as planogramActions from "../planogram/actions";
import * as productActions from "../product/actions";
import * as taskActions from "../task/actions";
import * as settingsActions from "../settings/actions";

import { LoadUserTheme, LoadUserLanguage } from "../settings/actions";

import history from "../../utils/history";

const signInUserWithEmailPasswordRequest = async (email_username, password) =>
  api.post("auth/login", { email_username, password });

const createUserWithEmailPasswordRequest = async (user) =>
  api.post("auth/register", { user });

const signOutRequest = async () =>
  api.post("login", { email_username, password });

/**
 * Signin User With Email & Password
 */
function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload.userData;
  try {
    const { data } = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );

    localStorage.setItem("user", JSON.stringify(data.user));
    yield put(signinUserSuccess(data.user));
    yield put(LoadUserTheme(data.user.user.profile_config));
    yield put(LoadUserLanguage(data.user.user.profile_config.language));

    history.push("/");
  } catch (error) {
    yield put(signinUserFailure());
  }
}

/**
 * Create User
 */
function* createUserWithEmailPassword({ payload }) {
  try {
    const { data } = yield call(
      createUserWithEmailPasswordRequest,
      payload.userData
    );
    localStorage.setItem("userToken", JSON.stringify(data.user));
    yield put(signUpUserSuccess(data.user));
    history.push("/");
  } catch (error) {
    yield put(signUpUserFailure(error));
  }
}

/**
 * Signout User
 */
function* signOut() {
  try {
    localStorage.removeItem("user");
    yield put(logoutUserSuccess());
    yield put(adminActions.resetAll());
    yield put(agentActions.resetAll());
    yield put(companyActions.resetAll());
    yield put(customerActions.resetAll());
    yield put(planogramActions.resetAll());
    yield put(productActions.resetAll());
    yield put(settingsActions.resetAll());
    yield put(taskActions.resetAll());
    yield put(settingsActions.resetAll());
    history.push("/user");
  } catch (error) {
    yield put(logoutUserFailure());
  }
}
function* updateProfileApi({ payload }) {
  const { userProfile } = payload;
  try {
    const { data } = yield call(() =>
      api.put(
        "/profile/",
        { userProfile },
        { headers: { "x-handle-request": true } }
      )
    );

    let currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser.user = data.user;
    localStorage.setItem("user", JSON.stringify(currentUser));

    yield put(updateProfileSuccess(data.user));
  } catch (error) {
    yield put(signinUserFailure());
  }
}

function* updateProfileEmailApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        "/profile/email",
        { email: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    let currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser.user = data.user;
    localStorage.setItem("user", JSON.stringify(currentUser));
    yield put(updateProfileEmailSuccess(data.user));
  } catch (error) {
    yield put(signinUserFailure());
  }
}

function* updateProfileLanguageApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        "/profile/language",
        { language: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    let currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser.user.profile_config = data.profile_config;
    localStorage.setItem("user", JSON.stringify(currentUser));
    yield put(updateProfileLanguageSuccess(data.profile_config));
    yield put(LoadUserLanguage(data.profile_config.language));
  } catch (error) {
    yield put(signinUserFailure());
  }
}

function* updateProfileThemeApi({ payload }) {
  try {
    const { data } = yield call(() =>
      api.put(
        "/profile/theme",
        { profile_settings: payload },
        { headers: { "x-handle-request": true } }
      )
    );

    let currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser.user.profile_config = data.profile_config;
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log(data);
    yield put(updateProfileThemeSuccess(data.profile_config));
    yield put(LoadUserTheme(data.profile_config));
  } catch (error) {
    yield put(signinUserFailure());
  }
}

export function* signinUser() {
  yield takeEvery(LOGIN_USER, signInUserWithEmailPassword);
}
export function* signupUser() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}
export function* signOutUser() {
  yield takeEvery(LOGOUT_USER, signOut);
}
export function* updateProfile() {
  yield takeEvery(UPDATE_PROFILE, updateProfileApi);
}
export function* updateProfileEmail() {
  yield takeEvery(UPDATE_PROFILE_EMAIL, updateProfileEmailApi);
}
export function* updateProfileLanguage() {
  yield takeEvery(UPDATE_PROFILE_LANGUAGE, updateProfileLanguageApi);
}
export function* updateProfileTheme() {
  yield takeEvery(UPDATE_PROFILE_THEME, updateProfileThemeApi);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(signinUser),
    fork(signupUser),
    fork(signOutUser),
    fork(updateProfile),
    fork(updateProfileEmail),
    fork(updateProfileLanguage),
    fork(updateProfileTheme),
  ]);
}
