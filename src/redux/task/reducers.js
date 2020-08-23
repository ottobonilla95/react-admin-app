import {
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASKS,
  CREATE_TASKS_SUCCESS,
  GET_TASK,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  DELETE_TASKS,
  DELETE_TASKS_SUCCESS,
  GET_TASKS,
  GET_TASKS_SUCCESS,
  ACTION_FAILED,
  OPEN_MODAL_FORM,
  OPEN_EDIT_MODAL_FORM,
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
  isTaskModalFormOpen: false,
  isDeleteDialogOpen: false,
  currentTask: {},
  isMassiveModalFormOpen: false,
};

const taskReducer = (state = initialState, action) => {
  let finalTasks;
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, loading: true };
    case CREATE_TASK_SUCCESS:
      finalTasks = state.data.items;
      finalTasks.push(action.payload.task);
      return {
        ...state,
        data: { ...state.data, items: finalTasks },
        loading: false,
        isTaskModalFormOpen: false,
      };
    case CREATE_TASKS:
      return { ...state, loading: true };
    case CREATE_TASKS_SUCCESS:
      return { ...state, loading: false, isMassiveModalFormOpen: false };
    case GET_TASK:
      return { ...state, loading: true };
    case UPDATE_TASK:
      return { ...state, loading: true };
    case UPDATE_TASK_SUCCESS:
      finalTasks = state.data.items.filter((task) => {
        if (task.id !== action.payload.id) {
          return true;
        }
      });

      finalTasks.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalTasks },
        loading: false,
        isTaskModalFormOpen: false,
      };
    case DELETE_TASKS:
      return { ...state, loading: true };
    case DELETE_TASKS_SUCCESS:
      finalTasks = state.data.items.filter((task) => {
        if (action.payload.includes(task.id)) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalTasks },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_TASKS:
      return { ...state, loading: true };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        data: action.payload.tasks,
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;

    case OPEN_MODAL_FORM:
      return { ...state, isTaskModalFormOpen: true, currentTask: {} };
    case OPEN_EDIT_MODAL_FORM:
      return {
        ...state,
        isTaskModalFormOpen: true,
        currentTask: action.payload,
      };

    case CLOSE_MODAL_FORM:
      return { ...state, isTaskModalFormOpen: false };
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

export default taskReducer;
