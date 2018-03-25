import { WORKSPACE_ADD_USER } from '../redux_actions/types';

const INITIAL_STATE = {
  userIDs: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case WORKSPACE_ADD_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
};
