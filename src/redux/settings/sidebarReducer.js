/**
 * Sidebar Reducers
 */
import update from "react-addons-update";
import {
  TOGGLE_MENU,
  GET_MENU_ITEMS,
  GET_MENU_ITEMS_SUCCESS,
  ACTION_FAILED,
  CLEAR_MENU_ITEMS,
  RESET_ALL,
} from "./types";

// omponents/AgencyMenu/NavLinks
const INIT_STATE = {
  sidebarMenus: [],
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return { ...state, loading: true };
    case GET_MENU_ITEMS_SUCCESS:
      return { ...state, loading: false, sidebarMenus: action.payload };

    case TOGGLE_MENU:
      let index = state.sidebarMenus.indexOf(action.payload.menu);
      for (let i = 0; i < state.sidebarMenus; i++) {
        const element = state.sidebarMenus[i];

        if (element.open) {
          return update(state, {
            sidebarMenus: {
              [i]: {
                open: { $set: false },
              },
            },
          });
        }
      }
      return update(state, {
        sidebarMenus: {
          [index]: {
            open: { $set: !action.payload.menu.open },
          },
        },
      });
    case CLEAR_MENU_ITEMS:
      return { ...state, sidebarMenus: [] };
    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return INIT_STATE;
    default:
      return { ...state };
  }
};
