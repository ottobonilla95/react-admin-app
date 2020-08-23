import {
  CREATE_COMPANY,
  CREATE_COMPANY_SUCCESS,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  GET_COMPANYS,
  GET_COMPANYS_SUCCESS,
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  ACTION_FAILED,
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG,
  RESET_ALL
} from "./types";

// CREATE
export const createCompany = (company) => {
  return {
    type: CREATE_COMPANY,
    payload: { company },
  };
};

export const createCompanySuccess = (company) => {
  return {
    type: CREATE_COMPANY_SUCCESS,
    payload: { company },
  };
};

// UPDATE
export const updateCompany = (company) => {
  return {
    type: UPDATE_COMPANY,
    payload: company,
  };
};
export const updateCompanySuccess = (company) => {
  return {
    type: UPDATE_COMPANY_SUCCESS,
    payload: company,
  };
};

// DELETE
export const deleteCompany = (id) => {
  return {
    type: DELETE_COMPANY,
    payload: id,
  };
};

export const deleteCompanySucess = (id) => {
  return {
    type: DELETE_COMPANY_SUCCESS,
    payload: id,
  };
};

// LIST
export const getCompanys = () => {
  return {
    type: GET_COMPANYS,
  };
};

export const getCompanysSuccess = (companys) => {
  return {
    type: GET_COMPANYS_SUCCESS,
    payload: { companys },
  };
};

// LIST
export const getCompany = (id) => {
  return {
    type: GET_COMPANY,
    payload: id,
  };
};

export const getCompanySuccess = (company) => {
  return {
    type: GET_COMPANY_SUCCESS,
    payload: { company },
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
