import { USER_FETCH_SUCCESS } from '../redux_actions/types';

const INITIAL_STATE = {
  users: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case USER_FETCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
