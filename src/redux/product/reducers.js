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

const initialState = {
  data: {
    items: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  loading: false,
  isProductModalFormOpen: false,
  isDeleteDialogOpen: false,
  isMassiveModalFormOpen: false,
};

const productReducer = (state = initialState, action) => {
  let finalProducts;
  switch (action.type) {
    case CREATE_PRODUCT:
      return { ...state, loading: true };
    case CREATE_PRODUCT_SUCCESS:
      finalProducts = state.data.items;
      finalProducts.push(action.payload.product);
      return {
        ...state,
        data: { ...state.data, items: finalProducts },
        loading: false,
        isProductModalFormOpen: false,
      };
    case CREATE_PRODUCTS:
      return { ...state, loading: true };
    case CREATE_PRODUCTS_SUCCESS:
      return { ...state, loading: false, isMassiveModalFormOpen: false };
    case GET_PRODUCT:
      return { ...state, loading: true };
    case UPDATE_PRODUCT:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      finalProducts = state.data.items.filter((product) => {
        if (product.id !== action.payload.id) {
          return true;
        }
      });

      finalProducts.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalProducts },
        loading: false,
        isProductModalFormOpen: false,
      };
    case DELETE_PRODUCTS:
      return { ...state, loading: true };
    case DELETE_PRODUCTS_SUCCESS:
      finalProducts = state.data.items.filter((product) => {
        if (action.payload.includes(product.id)) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalProducts },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_PRODUCTS:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload.products,
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;
    case OPEN_MODAL_FORM:
      return { ...state, isProductModalFormOpen: true };
    case CLOSE_MODAL_FORM:
      return { ...state, isProductModalFormOpen: false };
    case OPEN_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: true };
    case CLOSE_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: false };
    case OPEN_MASSIVE_MODAL:
      return { ...state, isMassiveModalFormOpen: true };
    case CLOSE_MASSIVE_MODAL:
      return { ...state, isMassiveModalFormOpen: false };
    default:
      return state;
  }
};

export default productReducer;
