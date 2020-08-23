import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCTS,
  CREATE_PRODUCTS_SUCCESS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  ACTION_FAILED,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_FORM,
  OPEN_DELETE_DIALOG,
  CLOSE_DELETE_DIALOG,
  RESET_ALL,
  OPEN_MASSIVE_MODAL,
  CLOSE_MASSIVE_MODAL,
} from "./types";

// CREATE
export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    payload: { product },
  };
};

export const createProductSuccess = (product) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: { product },
  };
};

// CREATE MASSIVE
export const createProducts = (products) => {
  return {
    type: CREATE_PRODUCTS,
    payload: { products },
  };
};

export const createProductsSuccess = (products) => {
  return {
    type: CREATE_PRODUCTS_SUCCESS,
    payload: { products },
  };
};

// READ
export const getProduct = (id) => {
  return {
    type: GET_PRODUCT,
    payload: id,
  };
};

// UPDATE
export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    payload: product,
  };
};
export const updateProductSuccess = (product) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
};

// DELETE
export const deleteProducts = (ids) => {
  return {
    type: DELETE_PRODUCTS,
    payload: ids,
  };
};

export const deleteProductSucess = (ids) => {
  return {
    type: DELETE_PRODUCTS_SUCCESS,
    payload: ids,
  };
};

// LIST
export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
  };
};

export const getProductsSuccess = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: { products },
  };
};

//OTHERS
export const actionFailed = (error) => {
  return {
    type: ACTION_FAILED,
    payload: error,
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
