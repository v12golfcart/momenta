import { 
  UPDATE_DATES,
  WORKSPACE_INFO_FETCH_SUCCESS,
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
          daily: action.payload.streakDaily,
        }
      };

    default:
      return state;
  }
};
