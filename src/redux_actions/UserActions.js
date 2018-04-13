// libraries
import firebase from 'firebase';

// constants
import { 
  EDIT_USER_NAME,
  ADD_USER,
  USER_FETCH_SUCCESS,  
} from './types';

export const editUserName = (value) => {
  return {
    type: EDIT_USER_NAME,
    payload: value,
  };
};

// because this is the first thing called, pageMain loading set to true
export const addUser = ({ name }) => {
  return (dispatch) => {
    const newUserRef = firebase.database().ref('/users').push();
    newUserRef.set({ 
      name,
      activeTasks: [],
    })
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