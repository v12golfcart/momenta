import { 
  UPDATE_DATES,
} from '../redux_actions/types';

const INITIAL_STATE = {
  dates: {
    today: '',
    yesterday: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_DATES:
      return {
        ...state,
        dates: action.payload,
      };

    default:
      return state;
  }
};
