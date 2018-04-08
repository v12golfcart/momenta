import { 
  EDIT_TASK_DESC,
  EDIT_TASK_USER,
  EDIT_TASK_STREAK,
  ADD_TASK,
} from '../redux_actions/types';

const INITIAL_STATE = {
  taskDesc: '',
  taskUserId: '',
  taskStreak: '0',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case EDIT_TASK_DESC:
      return {
        ...state,
        taskDesc: action.payload,
      };

    case EDIT_TASK_USER:
      return {
        ...state,
        taskUserId: action.payload,
      };

    case EDIT_TASK_STREAK:
      return {
        ...state,
        taskStreak: action.payload,
      };

    case ADD_TASK:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};
