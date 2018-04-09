// libraries
import moment from 'moment';

// constants
import { 
  UPDATE_DATES,
} from './types';

export const updateDates = () => {
  const tsToday = moment().format('YYYYMMDD');
  const tsYesterday = moment().add(-1, 'days').format('YYYYMMDD')
  return {
    type: UPDATE_DATES,
    payload: {
      today: tsToday,
      yesterday: tsYesterday,
    }
  };
};

// good resource: https://www.youtube.com/watch?v=sKFLI5FOOHs
export const testQuery = () => {

};
