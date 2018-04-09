// libraries
import firebase from 'firebase';

// constants
import { 
  EDIT_TASK_DESC,
  EDIT_TASK_USER,
  EDIT_TASK_STREAK,  
  TASK_FETCH_SUCCESS,
  RESOLVES_FETCH_SUCCESS,
  ADD_TASK,
  TOGGLE_TASK,
} from './types';

export const editTaskDesc = (newDesc) => {
  return {
    type: EDIT_TASK_DESC,
    payload: newDesc,
  };
};

export const editTaskUserId = (userId) => {
  return {
    type: EDIT_TASK_USER,
    payload: userId,
  };
};

export const editTaskStreak = (num) => {
  return {
    type: EDIT_TASK_STREAK,
    payload: num,
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
