import {
  CREATE_PLANOGRAM,
  CREATE_PLANOGRAM_SUCCESS,
  GET_PLANOGRAM,
  UPDATE_PLANOGRAM,
  UPDATE_PLANOGRAM_SUCCESS,
  DELETE_PLANOGRAM,
  DELETE_PLANOGRAM_SUCCESS,
  GET_PLANOGRAMS,
  GET_PLANOGRAMS_SUCCESS,
  ACTION_FAILED,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_FORM,
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG,
  RESET_ALL,
} from "./types";

// CREATE
export const createPlanogram = (planogram) => {
  return {
    type: CREATE_PLANOGRAM,
    payload: { planogram },
  };
};

export const createPlanogramSuccess = (planogram) => {
  return {
    type: CREATE_PLANOGRAM_SUCCESS,
    payload: { planogram },
  };
};

// READ
export const getPlanogram = (id) => {
  return {
    type: GET_PLANOGRAM,
    payload: id,
  };
};

// UPDATE
export const updatePlanogram = (planogram) => {
  return {
    type: UPDATE_PLANOGRAM,
    payload: planogram,
  };
};
export const updatePlanogramSuccess = (planogram) => {
  return {
    type: UPDATE_PLANOGRAM_SUCCESS,
    payload: planogram,
  };
};

// DELETE
export const deletePlanogram = (id) => {
  return {
    type: DELETE_PLANOGRAM,
    payload: id,
  };
};

export const deletePlanogramSucess = (id) => {
  return {
    type: DELETE_PLANOGRAM_SUCCESS,
    payload: id,
  };
};

// LIST
export const getPlanograms = () => {
  return {
    type: GET_PLANOGRAMS,
  };
};

export const getPlanogramsSuccess = (planograms) => {
  return {
    type: GET_PLANOGRAMS_SUCCESS,
    payload: { planograms },
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
