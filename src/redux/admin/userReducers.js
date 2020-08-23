import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_USERS,
  GET_USERS_SUCCESS,
  ACTION_FAILED,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_FORM,
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG,
  RESET_ALL,
} from "./types";

const initialState = {
  data: {
    items: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  loading: false,
  isUserModalFormOpen: false,
  isDeleteDialogOpen: false,
};

const userReducer = (state = initialState, action) => {
  let finalUsers;

  switch (action.type) {
    case CREATE_USER:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      finalUsers = state.data.items;

      finalUsers.push(action.payload.user);

      return {
        ...state,
        data: {
          ...state.data,
          items: finalUsers,
        },
        loading: false,
        isUserModalFormOpen: false,
      };

    case UPDATE_USER:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      finalUsers = state.data.items.filter((user) => {
        if (user.id !== action.payload.id) {
          return true;
        }
      });

      finalUsers.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalUsers },
        loading: false,
        isUserModalFormOpen: false,
      };
    case DELETE_USER:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      finalUsers = state.data.items.filter((user) => {
        if (action.payload == user.id) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalUsers },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_USERS:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.users,
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;

    case OPEN_MODAL_FORM:
      return { ...state, isUserModalFormOpen: true };
    case CLOSE_MODAL_FORM:
      return { ...state, isUserModalFormOpen: false };
    case OPEN_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: true };
    case CLOSE_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: false };

    default:
      return state;
  }
};

export default userReducer;
