// libraries
import firebase from 'firebase';

// constants
import { 
  ADD_USER,
  USER_FETCH_SUCCESS,
  TASK_FETCH_SUCCESS,
  RESOLVES_FETCH_SUCCESS,
  ADD_TASK,
  TOGGLE_TASK,
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

export const addTask = ({ taskUserId, taskDesc, taskStreak }) => {
  const db = firebase.database();

  return (dispatch) => {
    const newTaskRef = db.ref('/tasks').push();
    newTaskRef.set({
      taskUserId,
      taskDesc,
      taskStreak,
    })
    .then(() => {      
      dispatch({ type: ADD_TASK });
    });
  };
};

export const fetchTasks = () => {
  const db = firebase.database();

  return (dispatch) => {
    db.ref('/tasks')
      .on('value', snapshot => {
        dispatch({ 
          type: TASK_FETCH_SUCCESS,
          payload: snapshot.val() 
        });
      });
  };
};

export const toggleTask = (taskId, timestamp, binaryIsResolved) => {
  const db = firebase.database();

  return (dispatch) => {
    const todayResolveRef = db.ref(`/resolves/${timestamp}/${taskId}`);
    const newResolveValue = Math.abs(binaryIsResolved - 1);

    todayResolveRef.set({ binaryIsResolved: newResolveValue })
      .then(() => dispatch({ type: TOGGLE_TASK }));
  };
};

export const fetchResolves = () => {
  const db = firebase.database();

  return (dispatch) => {
    const resolvedRef = db.ref('/resolves');
    resolvedRef
      .limitToLast(2)
      .on('value', snapshot => {
        console.log('resolves fetch', snapshot.val());
        dispatch({
          type: RESOLVES_FETCH_SUCCESS,
          payload: snapshot.val(),
        });
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
