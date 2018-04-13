// constants
import { 
  UI_TOGGLE_TEST, 
  MODAL_OPEN,
  MODAL_CLOSE,
  IS_LOADING,
} from './types';

export const testToggleUi = () => {
  return {
    type: UI_TOGGLE_TEST,
  };
};

export const openModal = (modalType) => {
  return {
    type: MODAL_OPEN,
    payload: modalType,
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE,
  };
};

export const setToLoading = (componentName) => {
  return {
    type: IS_LOADING,
    payload: componentName,
  };
}
