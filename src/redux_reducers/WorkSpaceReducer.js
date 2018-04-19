import { 
  UPDATE_DATES,
  WORKSPACE_INFO_FETCH_SUCCESS,
  WORKSPACE_RESOLVED_FETCH_SUCCESS,
} from '../redux_actions/types';

const INITIAL_STATE = {
  dates: {
    today: '',
    yesterday: '',
  },
  workspaceStreaks: {
    daily: 0,
    weekly: 0,
  },
  workspaceResolvedDaily: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_DATES:
      return {
        ...state,
        dates: action.payload,
      };

    case WORKSPACE_INFO_FETCH_SUCCESS:
      return {
        ...state,
        workspaceStreaks: {
          ...state.workspaceStreaks,
          daily: action.payload ? action.payload.streakDaily : 0,
        }
      };

    case WORKSPACE_RESOLVED_FETCH_SUCCESS:
      return {
        ...state,
        workspaceResolvedDaily: action.payload
      };

    default:
      return state;
  }
};
