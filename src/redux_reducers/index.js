import { combineReducers } from 'redux';
import MiscUiReducer from './MiscUiReducer';
import WorkspaceReducer from './WorkspaceReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  miscUi: MiscUiReducer,
  workspace: WorkspaceReducer,
  settings: UserReducer,
});
