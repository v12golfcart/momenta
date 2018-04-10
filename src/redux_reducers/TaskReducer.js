import { 
  EDIT_TASK_DESC,
  EDIT_TASK_USER,
  EDIT_TASK_STREAK,
  ADD_TASK,
  TASK_FETCH_SUCCESS,
  RESOLVED_FETCH_SUCCESS,  
} from '../redux_actions/types';

const INITIAL_STATE = {
  newTask: {
    taskDesc: '',
    taskUserId: '',
    taskStreak: '0',
  },
  tasks: {},
  resolved: {}  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case EDIT_TASK_DESC:
      return {
        ...state,
        newTask: {
          ...state.newTask,
          taskDesc: action.payload,
        }
      };

    case EDIT_TASK_USER:
      return {
        ...state,
        newTask: {
          ...state.newTask,
          taskUserId: action.payload,
        }
      };

    case EDIT_TASK_STREAK:
      return {
        ...state,
        newTask: {
          ...state.newTask,
          taskStreak: action.payload,
        }        
      };

    case ADD_TASK:
      return {
        ...state,
        newTask: INITIAL_STATE.newTask,
      };

    case TASK_FETCH_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };

    case RESOLVED_FETCH_SUCCESS:
      return {
        ...state,
        resolved: action.payload,
      };

    default:
      return state;
  }
};
