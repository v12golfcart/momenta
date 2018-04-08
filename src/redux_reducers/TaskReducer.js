import { 
  EDIT_TASK_DESC,
  EDIT_TASK_USER,
  EDIT_TASK_STREAK,
  ADD_TASK,
} from '../redux_actions/types';

const INITIAL_STATE = {
  newTaskDesc: '',
  newTaskUserId: '',
  newTaskStreak: '0',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case EDIT_TASK_DESC:
      return {
        ...state,
        newTaskDesc: action.payload,
      };

    case EDIT_TASK_USER:
      return {
        ...state,
        newTaskUserId: action.payload,
      };

    case EDIT_TASK_STREAK:
      return {
        ...state,
        newTaskStreak: action.payload,
      };

    case ADD_TASK:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};
