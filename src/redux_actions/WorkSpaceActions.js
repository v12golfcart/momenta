// libraries
import firebase from 'firebase';

// constants
import { 

} from './types';

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
