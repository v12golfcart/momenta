// libraries
import firebase from 'firebase';

// constants
import { 
  ADD_USER,
  USER_FETCH_SUCCESS,
} from './types';

export const addUser = ({ name }) => {
  return (dispatch) => {
    firebase.database().ref('/users')
      .push({ name })
      .then(() => {
        dispatch({ type: ADD_USER });
      });
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    firebase.database().ref('/users')
      .on('value', snapshot => {
        dispatch({ 
          type: USER_FETCH_SUCCESS,
          payload: snapshot.val() 
        });
      });
  };
};
