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
  RESET_ALL
} from "./types";

// CREATE
export const createUser = (user) => {
  return {
    type: CREATE_USER,
    payload: { user },
  };
};

export const createUserSuccess = (user) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: { user },
  };
};

// UPDATE
export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};
export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

// DELETE
export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};

export const deleteUserSucess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: id,
  };
};

// LIST
export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: { users },
  };
};

//OTHERS
export const actionFailed = () => {
  return {
    type: ACTION_FAILED,
  };
};

export const resetAll = () => {
  return {
    type: RESET_ALL,
  };
};


// MODALS

export const openModalFrom = () => {
  return {
    type: OPEN_MODAL_FORM,
  };
};

export const closeModalFrom = () => {
  return {
    type: CLOSE_MODAL_FORM,
  };
};

export const openDeleteDialog = () => {
  return {
    type: OPEN_DELETE_DIALOG,
  };
};
export const closeDeleteDialog = () => {
  return {
    type: CLOSE_DELETE_DIALOG,
  };
};
