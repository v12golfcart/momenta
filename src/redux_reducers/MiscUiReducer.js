import { 
  UI_TOGGLE_TEST,
  MODAL_OPEN,
  MODAL_CLOSE,
  ADD_USER,
  ADD_TASK,
  EDIT_TASK,
  IS_LOADING,
  WORKSPACE_RESOLVED_FETCH_SUCCESS,
} from '../redux_actions/types';

const INITIAL_STATE = {
  testBoolean: false,
  isModalVisible: false,
  modalType: '',
  isLoading: {
    pageMain: true,
  }
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

    case ADD_USER:
      return {
        ...state,
        isModalVisible: false,
      };

    case ADD_TASK:
      return {
        ...state,
        isModalVisible: false,
      };

    case EDIT_TASK:
      return {
        ...state,
        isModalVisible: false,
      };

    // loading
    case IS_LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload]: true,
        },
      };

    case WORKSPACE_RESOLVED_FETCH_SUCCESS: 
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          pageMain: false,
        }
      };

    default:
      return state;
  }
};
