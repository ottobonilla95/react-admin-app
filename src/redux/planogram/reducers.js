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

const initialState = {
  data: {
    items: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  loading: false,
  isPlanogramModalFormOpen: false,
  isDeleteDialogOpen: false,
};

const planogramReducer = (state = initialState, action) => {
  let finalPlanograms;
  switch (action.type) {
    case CREATE_PLANOGRAM:
      return { ...state, loading: true };
    case CREATE_PLANOGRAM_SUCCESS:
      finalPlanograms = state.data.items;
      finalPlanograms.push(action.payload.planogram);
      return {
        ...state,
        data: { ...state.data, items: finalPlanograms },
        loading: false,
        isPlanogramModalFormOpen: false,
      };
    case GET_PLANOGRAM:
      return { ...state, loading: true };
    case UPDATE_PLANOGRAM:
      return { ...state, loading: true };
    case UPDATE_PLANOGRAM_SUCCESS:
      finalPlanograms = state.data.items.filter((planogram) => {
        if (planogram.id !== action.payload.id) {
          return true;
        }
      });

      finalPlanograms.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalPlanograms },
        loading: false,
        isPlanogramModalFormOpen: false,
      };
    case DELETE_PLANOGRAM:
      return { ...state, loading: true };
    case DELETE_PLANOGRAM_SUCCESS:
      finalPlanograms = state.data.items.filter((planogram) => {
        if (action.payload === planogram.id) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalPlanograms },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_PLANOGRAMS:
      return { ...state, loading: true };
    case GET_PLANOGRAMS_SUCCESS:
      return {
        ...state,
        data: action.payload.planograms,
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;

    case OPEN_MODAL_FORM:
      return { ...state, isPlanogramModalFormOpen: true };
    case CLOSE_MODAL_FORM:
      return { ...state, isPlanogramModalFormOpen: false };
    case OPEN_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: true };
    case CLOSE_DELETE_DIALOG:
      return { ...state, isDeleteDialogOpen: false };
    default:
      return state;
  }
};

export default planogramReducer;
