// constants
import { 
  EDIT_USER_NAME,
} from './types';

export const editUserName = (value) => {
  return {
    type: EDIT_USER_NAME,
    payload: value,
  };
};
