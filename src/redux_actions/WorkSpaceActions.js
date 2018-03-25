// constants
import { WORKSPACE_ADD_USER } from './types';

export const addPerson = (name) => {
  return {
    type: WORKSPACE_ADD_USER,
    payload: { name },
  };
};
