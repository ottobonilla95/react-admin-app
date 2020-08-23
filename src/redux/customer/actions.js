import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMERS,
  CREATE_CUSTOMERS_SUCCESS,
  GET_CUSTOMER,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMERS,
  DELETE_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  ACTION_FAILED,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_FORM,
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG,
  OPEN_MASSIVE_MODAL,
  CLOSE_MASSIVE_MODAL,
  RESET_ALL,
} from "./types";

// CREATE
export const createCustomer = (customer, isCustomerCommingFromTaskForm) => {
  return {
    type: CREATE_CUSTOMER,
    payload: { customer, isCustomerCommingFromTaskForm },
  };
};

export const createCustomerSuccess = (
  customer,
  isCustomerCommingFromTaskForm
) => {
  return {
    type: CREATE_CUSTOMER_SUCCESS,
    payload: { customer, isCustomerCommingFromTaskForm },
  };
};

// CREATE MASSIVE
export const createCustomers = (customers) => {
  return {
    type: CREATE_CUSTOMERS,
    payload: { customers },
  };
};

export const createCustomersSuccess = (customers) => {
  return {
    type: CREATE_CUSTOMERS_SUCCESS,
    payload: { customers },
  };
};

// READ
export const getCustomer = (id) => {
  return {
    type: GET_CUSTOMER,
    payload: id,
  };
};

// UPDATE
export const updateCustomer = (customer) => {
  return {
    type: UPDATE_CUSTOMER,
    payload: customer,
  };
};
export const updateCustomerSuccess = (customer) => {
  return {
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: customer,
  };
};

// DELETE
export const deleteCustomers = (ids) => {
  return {
    type: DELETE_CUSTOMERS,
    payload: ids,
  };
};

export const deleteCustomerSucess = (ids) => {
  return {
    type: DELETE_CUSTOMERS_SUCCESS,
    payload: ids,
  };
};

// LIST
export const getCustomers = () => {
  return {
    type: GET_CUSTOMERS,
  };
};

export const getCustomersSuccess = (customers) => {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload: { customers },
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

export const openMassiveModal = () => {
  return {
    type: OPEN_MASSIVE_MODAL,
  };
};
export const closeMassiveModal = () => {
  return {
    type: CLOSE_MASSIVE_MODAL,
  };
};
