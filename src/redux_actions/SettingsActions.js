// constants
import { 
  WORKSPACE_ADD_USER,
  EDIT_USER_NAME,
} from './types';

export const addPerson = (name) => {
  return {
    type: WORKSPACE_ADD_USER,
    payload: { name },
  };
};

export const editUserName = (value) => {
  return {
    type: EDIT_USER_NAME,
    payload: value,
  };
};
