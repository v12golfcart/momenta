// libraries
import firebase from 'firebase';

// constants
import { 
  ADD_USER,
  USER_FETCH_SUCCESS,
  ADD_TASK,
} from './types';

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

export const addTask = ({ newTaskUserId, newTaskDesc, newTaskStreak, isDoneToday }) => {
  const db = firebase.database();

  return (dispatch) => {
    const newTaskRef = db.ref('/tasks').push();
    newTaskRef.set({
      newTaskUserId,
      newTaskDesc,
      newTaskStreak,
      isDoneToday,
    })
    .then(() => {
      dispatch({ type: ADD_TASK });
    })
    .then(() => {

    });
  };
};

// good resource: https://www.youtube.com/watch?v=sKFLI5FOOHs

export const testQuery = () => {
  const db = firebase.database();
  
  return (dispatch) => {
    const testRef = db.ref();
    testRef
      .child('users')
      .orderByChild('name')
      .equalTo('Chris Ramesh')
      .on('value', snap => console.log(snap.val()));
    dispatch({ type: 'LOL' });
  };
};
