// constants
import { 
  EDIT_TASK_DESC,
  EDIT_TASK_USER,
  EDIT_TASK_STREAK,
} from './types';

export const editTaskDesc = (newDesc) => {
  return {
    type: EDIT_TASK_DESC,
    payload: newDesc,
  };
};

export const editTaskUser = (user) => {
  return {
    type: EDIT_TASK_USER,
    payload: user,
  };
};

export const editTaskStreak = (num) => {
  return {
    type: EDIT_TASK_STREAK,
    payload: num,
  };
};
