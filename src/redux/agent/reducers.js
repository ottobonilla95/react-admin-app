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

const initialState = {
  data: {
    items: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  loading: false,
  isAgentModalFormOpen: false,
  isDeleteDialogOpen: false,
  isMassiveModalFormOpen: false,
};

const agentReducer = (state = initialState, action) => {
  let finalAgents;
  switch (action.type) {
    case CREATE_AGENT:
      return { ...state, loading: true };
    case CREATE_AGENT_SUCCESS:
      finalAgents = state.data.items;
      finalAgents.push(action.payload.agent);
      return {
        ...state,
        data: { ...state.data, items: finalAgents },
        loading: false,
        isAgentModalFormOpen: false,
      };
    case CREATE_AGENTS:
      return { ...state, loading: true };
    case CREATE_AGENTS_SUCCESS:
      return { ...state, loading: false, isMassiveModalFormOpen: false };
    case GET_AGENT:
      return { ...state, loading: true };
    case UPDATE_AGENT:
      return { ...state, loading: true };
    case UPDATE_AGENT_SUCCESS:
      finalAgents = state.data.items.filter((agent) => {
        if (agent.id !== action.payload.id) {
          return true;
        }
      });

      finalAgents.push(action.payload);
      return {
        ...state,
        data: { ...state.data, items: finalAgents },
        loading: false,
        isAgentModalFormOpen: false,
      };
    case DELETE_AGENTS:
      return { ...state, loading: true };
    case DELETE_AGENTS_SUCCESS:
      finalAgents = state.data.items.filter((agent) => {
        if (action.payload.includes(agent.id)) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        data: { ...state.data, items: finalAgents },
        loading: false,
        isDeleteDialogOpen: false,
      };
    case GET_AGENTS:
      return { ...state, loading: true };
    case GET_AGENTS_SUCCESS:
      return {
        ...state,
        data: action.payload.agents,
        loading: false,
      };

    case ACTION_FAILED:
      return { ...state, loading: false };
    case RESET_ALL:
      return initialState;

    case OPEN_MODAL_FORM:
      return { ...state, isAgentModalFormOpen: true };
    case CLOSE_MODAL_FORM:
      return { ...state, isAgentModalFormOpen: false };
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

export default agentReducer;
