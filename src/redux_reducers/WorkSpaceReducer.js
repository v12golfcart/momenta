import { ADD_USER } from '../redux_actions/types';

const INITIAL_STATE = {
  workspaceId: '',
  userIDs: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ADD_USER:
      return state;

    default:
      return state;
  }
};
