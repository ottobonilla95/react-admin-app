import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_MENU_ITEMS } from "./types";

import * as settingActions from "./actions";

import api from "../../api";

function* getMenuItemsApi() {
  try {
    const { data } = yield call(() =>
      api.get("/app/menu", { headers: { "x-handle-request": true } })
    );

    let finalMenu = [];

    finalMenu = data.menu.filter((menuItem) => {
      if (!menuItem.father_id) {
        return true;
      }
    });

    let finalMenuChildren = data.menu.filter((menuItem) => {
      if (menuItem.father_id) {
        return true;
      }
    });

    for (var i = 0; i < finalMenuChildren.length; i++) {
      let currentMenuItem = finalMenu.find((menuItem) => {
        if (finalMenuChildren[i].father_id == menuItem.id) {
          return true;
        }
      });

      if (!currentMenuItem.child_routes) {
        currentMenuItem.child_routes = [];
      }
      currentMenuItem.child_routes.push(finalMenuChildren[i]);
    }

    yield put(settingActions.getMenuItemsSuccess(finalMenu));
  } catch (error) {
    yield put(settingActions.actionFailed());
  }
}

export function* getMenuItems() {
  yield takeEvery(GET_MENU_ITEMS, getMenuItemsApi);
}

/**
 * Customer Root Saga
 */
export default function* rootSaga() {
  yield all([fork(getMenuItems)]);
}
