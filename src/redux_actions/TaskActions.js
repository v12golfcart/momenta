// libraries
import firebase from 'firebase';

// constants
import { 
  EDIT_TASK_ID,
  EDIT_TASK_DESC,
  EDIT_TASK_USER,
  EDIT_TASK_STREAK,  
  TASK_FETCH_SUCCESS,
  RESOLVED_FETCH_SUCCESS,
  ADD_TASK,
  TOGGLE_TASK,
  UPDATE_DAILY_STREAK,
  DELETE_TASK,
  EDIT_TASK
} from './types';

export const editTaskId = (id) => {
  return {
    type: EDIT_TASK_ID,
    payload: id,
  };
};


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
    payload: num.toString(),
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

export const editTask = (taskId, taskDesc) => {
  const db = firebase.database();

  return (dispatch) => {
    const taskRef = db.ref(`/tasks/${taskId}`);
    taskRef.update({ taskDesc })
    .then(() => {
      dispatch({ type: EDIT_TASK });
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

export const toggleTask = (taskId, timestamp, newBinaryIsResolved) => {
  const db = firebase.database();

  return (dispatch) => {
    const todayResolveRef = db.ref(`/resolved/${timestamp}/${taskId}`);
    todayResolveRef.set({ binaryIsResolved: newBinaryIsResolved })
      .then(() => dispatch({ type: TOGGLE_TASK }));
  }; // 1 -> -1, 0 -> 1  1 - 2 * x
};

export const updateDailyStreak = (taskId, newStreak) => {
  const db = firebase.database();

  return (dispatch) => {
    const taskRef = db.ref(`/tasks/${taskId}`);
    taskRef.update({ taskStreak: newStreak })
      .then(() => dispatch({ type: UPDATE_DAILY_STREAK }));
  };  
};

export const fetchResolved = () => {
  const db = firebase.database();

  return (dispatch) => {
    const resolvedRef = db.ref('/resolved');
    resolvedRef
      .limitToLast(3)
      .on('value', snapshot => {
        dispatch({
          type: RESOLVED_FETCH_SUCCESS,
          payload: snapshot.val(),
        });
      });
  };
};

export const deleteTask = (taskId, today) => {
  const db = firebase.database();

  return (dispatch) => {
    // delete the task from tasks table
    const taskRef = db.ref('/tasks');
    const todayRef = db.ref(`/resolved/${today}`);
    taskRef.child(taskId).remove();
    todayRef.child(taskId).remove()
    // delete the task from today 
    .then(() => {
      dispatch({ type: DELETE_TASK });
    });    
  };
};
