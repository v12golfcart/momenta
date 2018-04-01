import { 
  EDIT_USER_NAME,
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

    default:
      return state;
  }
};
