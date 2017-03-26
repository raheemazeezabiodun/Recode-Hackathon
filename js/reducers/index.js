import { combineReducers } from 'redux';
import globalNavigationReducer from './globalNavigator';
import authReducer from './auth';

export default combineReducers({
    globalNavigator: globalNavigationReducer,
    auth: authReducer
})