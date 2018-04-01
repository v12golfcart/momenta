import { combineReducers } from 'redux';
import MiscUiReducer from './MiscUiReducer';
//import WorkSpaceReducer from './WorkSpaceReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  miscUi: MiscUiReducer,
  //workspace: WorkSpaceReducer,
  settings: SettingsReducer,
});
