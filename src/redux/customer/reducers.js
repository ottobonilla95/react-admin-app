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

const initialState = {
  data: {
    items: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  loading: false,
  isCustomerModalFormOpen: false,
  isMassiveModalFormOpen: false,
  isDeleteDialogOpen: false,
  customerCommingFromTaskForm: undefined,
};

const customerReducer = (state = initialState, action) => {
  let finalCustomers;
  switch (action.type) {
    case CREATE_CUSTOMER:
      return { ...state, loading: true };
    case CREATE_CUSTOMER_SUCCESS:
      finalCustomers = state.data.items;
      let customerCommingFromTaskForm;
      if (action.payload.isCustomerCommingFromTaskForm) {
        customerCommingFromTaskForm = action.payload.customer;
      } else {
        customerCommingFromTaskForm = undefined;
      }
      finalCustomers.push(action.payload.customer);

      return {
        ...state,
        data: {
          ...state.data,
          items: finalCustomers,
        },
        loading: false,
        isCustomerModalFormOpen: false,
        customerCommingFromTaskForm,
      };
    case CREATE_CUSTOMERS:
      return { ...state, loading: true };
    case CREATE_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, isMassiveModalFormOpen: false };
    case GET_CUSTOMER:
      return { ...state, loading: true };
    case UPDATE_CUSTOMER:
      return { ...state, loading: true };
    case UPDATE_CUSTOMER_SUCCESS:
      finalCustomers = state.data.items.filter((customer) => {
        if (customer.id !== action.payload.id) {
          return true;
        }
      });

      finalCustomers.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalCustomers },
        loading: false,
        isCustomerModalFormOpen: false,
      };
    case DELETE_CUSTOMERS:
      return { ...state, loading: true };
    case DELETE_CUSTOMERS_SUCCESS:
      finalCustomers = state.data.items.filter((customer) => {
        if (action.payload.includes(customer.id)) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalCustomers },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_CUSTOMERS:
      return { ...state, loading: true };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        data: action.payload.customers,
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;
    case OPEN_MODAL_FORM:
      return { ...state, isCustomerModalFormOpen: true };
    case CLOSE_MODAL_FORM:
      return { ...state, isCustomerModalFormOpen: false };
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

export default customerReducer;
