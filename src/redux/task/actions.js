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

// CREATE
export const createTask = (task) => {
  return {
    type: CREATE_TASK,
    payload: { task },
  };
};

export const createTaskSuccess = (task) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: { task },
  };
};

// CREATE MASSIVE
export const createTasks = (tasks) => {
  return {
    type: CREATE_TASKS,
    payload: { tasks },
  };
};

export const createTasksSuccess = (tasks) => {
  return {
    type: CREATE_TASKS_SUCCESS,
    payload: { tasks },
  };
};
// READ
export const getTask = (id) => {
  return {
    type: GET_TASK,
    payload: id,
  };
};

// UPDATE
export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    payload: task,
  };
};
export const updateTaskSuccess = (task) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: task,
  };
};

// DELETE
export const deleteTasks = (ids) => {
  return {
    type: DELETE_TASKS,
    payload: ids,
  };
};

export const deleteTaskSucess = (ids) => {
  return {
    type: DELETE_TASKS_SUCCESS,
    payload: ids,
  };
};

// LIST
export const getTasks = () => {
  return {
    type: GET_TASKS,
  };
};

export const getTasksSuccess = (tasks) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: { tasks },
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

export const openModalFrom = () => {
  return {
    type: OPEN_MODAL_FORM,
  };
};

export const openEditModalFrom = (task) => {
  return {
    type: OPEN_EDIT_MODAL_FORM,
    payload: task,
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
