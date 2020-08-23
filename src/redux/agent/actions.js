import {
  CREATE_AGENT,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENTS,
  CREATE_AGENTS_SUCCESS,
  GET_AGENT,
  UPDATE_AGENT,
  UPDATE_AGENT_SUCCESS,
  DELETE_AGENTS,
  DELETE_AGENTS_SUCCESS,
  GET_AGENTS,
  GET_AGENTS_SUCCESS,
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
export const createAgent = (agent) => {
  return {
    type: CREATE_AGENT,
    payload: { agent },
  };
};

export const createAgentSuccess = (agent) => {
  return {
    type: CREATE_AGENT_SUCCESS,
    payload: { agent },
  };
};
// CREATE MASSIVE
export const createAgents = (agents) => {
  return {
    type: CREATE_AGENTS,
    payload: { agents },
  };
};

export const createAgentsSuccess = (agents) => {
  return {
    type: CREATE_AGENTS_SUCCESS,
    payload: { agents },
  };
};

// READ
export const getAgent = (id) => {
  return {
    type: GET_AGENT,
    payload: id,
  };
};

// UPDATE
export const updateAgent = (agent) => {
  return {
    type: UPDATE_AGENT,
    payload: agent,
  };
};
export const updateAgentSuccess = (agent) => {
  return {
    type: UPDATE_AGENT_SUCCESS,
    payload: agent,
  };
};

// DELETE
export const deleteAgents = (ids) => {
  return {
    type: DELETE_AGENTS,
    payload: ids,
  };
};

export const deleteAgentSucess = (ids) => {
  return {
    type: DELETE_AGENTS_SUCCESS,
    payload: ids,
  };
};

// LIST
export const getAgents = () => {
  return {
    type: GET_AGENTS,
  };
};

export const getAgentsSuccess = (agents) => {
  return {
    type: GET_AGENTS_SUCCESS,
    payload: { agents },
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

export const openModalFrom2 = () => {
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
