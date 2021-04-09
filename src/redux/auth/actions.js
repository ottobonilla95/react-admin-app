/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGOUT_USER_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_EMAIL,
  UPDATE_PROFILE_EMAIL_SUCCESS,
  UPDATE_PROFILE_LANGUAGE,
  UPDATE_PROFILE_LANGUAGE_SUCCESS,
  UPDATE_PROFILE_THEME,
  UPDATE_PROFILE_THEME_SUCCESS,
} from "./types";

/**
 * Redux Action To Sigin User
 */
export const signinUser = (userData) => ({
  type: LOGIN_USER,
  payload: { userData },
});

/**
 * Redux Action Signin User Success
 */
export const signinUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
/**
 * Redux Action Signin User Failure
 */
export const signinUserFailure = () => ({
  type: LOGIN_USER_FAILURE,
});

/**
 * Redux Action To Signup User 
 */
export const signupUser = (userData) => ({
  type: SIGNUP_USER,
  payload: { userData },
});

/**
 * Redux Action To Signup User Success
 */
export const signUpUserSuccess = (user) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: user,
});

/**
 * Redux Action To Signup User Failure
 */
export const signUpUserFailure = () => ({
  type: SIGNUP_USER_FAILURE,
});

/**
 * Redux Action To Signout
 */
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

/**
 * Redux Action Signout User Success
 */
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

/**
 * Redux Action Signout User Failure
 */
export const logoutUserFailure = () => ({
  type: LOGOUT_USER_FAILURE,
});

// profile
export const updateProfile = (userProfile) => {
  return {
    type: UPDATE_PROFILE,
    payload: { userProfile },
  };
};

export const updateProfileSuccess = (user) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { user },
});

// email
export const updateProfileEmail = (email) => ({
  type: UPDATE_PROFILE_EMAIL,
  payload: email,
});

export const updateProfileEmailSuccess = (user) => ({
  type: UPDATE_PROFILE_EMAIL_SUCCESS,
  payload: { user },
});

// language
export const updateProfileLanguage = (language) => ({
  type: UPDATE_PROFILE_LANGUAGE,
  payload: language,
});

export const updateProfileLanguageSuccess = (profileConfig) => ({
  type: UPDATE_PROFILE_LANGUAGE_SUCCESS,
  payload: profileConfig,
});

// theme
export const updateProfileTheme = (themeConfig) => ({
  type: UPDATE_PROFILE_THEME,
  payload: themeConfig,
});

export const updateProfileThemeSuccess = (profileConfig) => ({
  type: UPDATE_PROFILE_THEME_SUCCESS,
  payload: profileConfig,
});

//   others
export const actionFailed = () => ({
  type: ACTION_FAILED,
});
