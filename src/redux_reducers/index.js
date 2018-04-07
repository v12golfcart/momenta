import { combineReducers } from 'redux';
import MiscUiReducer from './MiscUiReducer';
import WorkspaceReducer from './WorkspaceReducer';
import UserReducer from './UserReducer';
import TaskReducer from './TaskReducer';

export default combineReducers({
  miscUi: MiscUiReducer,
  workspace: WorkspaceReducer,
  user: UserReducer,
  task: TaskReducer,
});
