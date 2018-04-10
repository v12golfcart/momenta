// libraries
import moment from 'moment';

// constants
import { 
  UPDATE_DATES,
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

// good resource: https://www.youtube.com/watch?v=sKFLI5FOOHs
export const testQuery = () => {

};
