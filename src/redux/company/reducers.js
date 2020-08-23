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

const initialState = {
  data: {
    items: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  loading: false,
  isDeleteDialogOpen: false,
};

const companyReducer = (state = initialState, action) => {
  let finalCompanys;

  switch (action.type) {
    case CREATE_COMPANY:
      return { ...state, loading: true };
    case CREATE_COMPANY_SUCCESS:
      finalCompanys = state.data.items;

      finalCompanys.push(action.payload.company);

      return {
        ...state,
        data: {
          ...state.data,
          items: finalCompanys,
        },
        loading: false,
      };

    case UPDATE_COMPANY:
      return { ...state, loading: true };
    case UPDATE_COMPANY_SUCCESS:
      finalCompanys = state.data.items.filter((company) => {
        if (company.id !== action.payload.id) {
          return true;
        }
      });

      finalCompanys.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalCompanys },
        loading: false,
      };
    case DELETE_COMPANY:
      return { ...state, loading: true };
    case DELETE_COMPANY_SUCCESS:
      finalCompanys = state.data.items.filter((company) => {
        if (action.payload == company.id) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalCompanys },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_COMPANYS:
      return { ...state, loading: true };
    case GET_COMPANYS_SUCCESS:
      return {
        ...state,
        data: action.payload.companys,
        loading: false,
      };

    case GET_COMPANY:
      return { ...state, loading: true };
    case GET_COMPANY_SUCCESS:
      finalCompanys = state.data.items;

      finalCompanys.push(action.payload.company);

      return {
        ...state,
        data: {
          ...state.data,
          items: finalCompanys,
        },
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;

    case OPEN_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: true };
    case CLOSE_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: false };

    default:
      return state;
  }
};

export default companyReducer;
