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
    firebase.database().ref('/users')
      .push({ 
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

export const addTask = ({ newTaskUser, newTaskDesc, newTaskStreak, isDoneToday }) => {
  return (dispatch) => {
    firebase.database().ref('/tasks')
    .push({
      newTaskUser,
      newTaskDesc,
      newTaskStreak,
      isDoneToday,
    })
    .then(() => {
      dispatch({ type: ADD_TASK });
    });
  };
};
