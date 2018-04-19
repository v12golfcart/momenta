// libraries
import firebase from 'firebase';
import moment from 'moment';

// constants
import { 
  UPDATE_DATES,
  WORKSPACE_STREAK_CHECK_DAILY,
  WORKSPACE_INFO_FETCH_SUCCESS,
  WORKSPACE_RESOLVED_FETCH_SUCCESS
} from './types';

export const updateDates = (transformDays = 0) => {
  const tsToday = moment().add(transformDays, 'days').format('YYYYMMDD');
  const tsYesterday = moment().add((transformDays - 1), 'days').format('YYYYMMDD');
  return {
    type: UPDATE_DATES,
    payload: {
      today: tsToday,
      yesterday: tsYesterday,
    }
  };
};

export const workspaceStreakCheckDaily = (newWorkspaceStreak, today, isResolved) => {
  console.log('workspace fx', newWorkspaceStreak, today, isResolved);
  const db = firebase.database();
  return (dispatch) => {
    const workspaceInfoRef = db.ref('/workspaceInfo');
    const workspaceResolvedRef = db.ref('/workspaceResolvedDaily/');
    
    Promise.all([
      workspaceInfoRef.update({ streakDaily: newWorkspaceStreak }),
      workspaceResolvedRef.update({ [today]: isResolved }),
    ])
    .then(() => {
      dispatch({ 
        type: WORKSPACE_STREAK_CHECK_DAILY,
      });
    });
  };
};

export const fetchWorkspaceInfo = () => {
  const db = firebase.database();

  return (dispatch) => {
    const workspaceInfoRef = db.ref('/workspaceInfo');
    workspaceInfoRef
      .on('value', snapshot => {
        dispatch({
          type: WORKSPACE_INFO_FETCH_SUCCESS,
          payload: snapshot.val(),
        });
      });
  };  
};

export const fetchWorkspaceResolved = () => {
  const db = firebase.database();

  return (dispatch) => {
    const workspaceResolvedRef = db.ref('/workspaceResolvedDaily');
    workspaceResolvedRef
      .limitToLast(3)
      .on('value', snapshot => {
        dispatch({
          type: WORKSPACE_RESOLVED_FETCH_SUCCESS,
          payload: snapshot.val(),
        });
      });
  };
};

// good resource: https://www.youtube.com/watch?v=sKFLI5FOOHs
export const testQuery = () => {

};
