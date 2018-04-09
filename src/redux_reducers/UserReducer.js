import { 
  EDIT_USER_NAME,
  ADD_USER,
  USER_FETCH_SUCCESS,
} from '../redux_actions/types';

const INITIAL_STATE = {
  newUserName: '',
  users: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case EDIT_USER_NAME:
      return {
        ...state,
        newUserName: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        newUserName: '',
      };

    case USER_FETCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
