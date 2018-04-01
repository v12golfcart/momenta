import { 
  EDIT_USER_NAME,
  WORKSPACE_ADD_USER,
} from '../redux_actions/types';

const INITIAL_STATE = {
  newUserName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case EDIT_USER_NAME:
      return {
        ...state,
        newUserName: action.payload,
      };

    case WORKSPACE_ADD_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
};
