import { 
  UI_TOGGLE_TEST,
  MODAL_OPEN,
  MODAL_CLOSE,
} from '../redux_actions/types';

const INITIAL_STATE = {
  testBoolean: false,
  isModalVisible: false,
  modalType: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UI_TOGGLE_TEST:
      return {
        ...state,
        testBoolean: !state.testBoolean,
      };

    case MODAL_OPEN:
      return {
        ...state,
        modalType: action.payload,
        isModalVisible: true,
      };

    case MODAL_CLOSE:
      return {
        ...state,
        isModalVisible: false,
      };

    default:
      return state;
  }
};
