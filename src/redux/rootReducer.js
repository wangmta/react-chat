import { combineReducers } from 'redux';
import { setGlobalSettingsReducer } from '../pages/SettingPage/settingReducer';

export default combineReducers({
  globalSettingsState: setGlobalSettingsReducer
});
