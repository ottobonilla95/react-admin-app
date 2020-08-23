import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_EMAIL,
  UPDATE_PROFILE_EMAIL_SUCCESS,
  UPDATE_PROFILE_LANGUAGE,
  UPDATE_PROFILE_LANGUAGE_SUCCESS,
  UPDATE_PROFILE_THEME,
  UPDATE_PROFILE_THEME_SUCCESS,
  ACTION_FAILED,
} from "./types";

const INIT_STATE = {
  user: { user: {}, userToken: {} },
  isLoggedIn: false,
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isLoggedIn: true,
      };

    case LOGIN_USER_FAILURE:
      return { ...state, loading: false };

    case LOGOUT_USER:
      return { ...state, loading: true };

    case LOGOUT_USER_SUCCESS:
      return INIT_STATE;

    case LOGOUT_USER_FAILURE:
      return { ...state };

    case SIGNUP_USER:
      return { ...state, loading: true };

    case SIGNUP_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case SIGNUP_USER_FAILURE:
      return { ...state, loading: false };

    case UPDATE_PROFILE:
      return { ...state, loading: true };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, user: action.payload.user },
      };
    case UPDATE_PROFILE_EMAIL:
      return { ...state, loading: true };
    case UPDATE_PROFILE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, user: action.payload.user },
      };

    case UPDATE_PROFILE_LANGUAGE:
      return { ...state, loading: true };

    case UPDATE_PROFILE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          user: { ...state.user.user, profile_config: action.payload },
        },
      };

    case UPDATE_PROFILE_THEME:
      return { ...state, loading: true };

    case UPDATE_PROFILE_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          user: { ...state.user.user, profile_config: action.payload },
        },
      };

    case ACTION_FAILED:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
