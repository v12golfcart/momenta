// libraries
import firebase from 'firebase';

// constants
import { 
  ADD_USER,
} from './types';

export const addUser = (name) => {
  return (dispatch) => {
    firebase.database().ref('/users')
      .push(name)
      .then(() => {
        dispatch({ type: ADD_USER });
      });
  };
};
