import {combineReducers} from 'redux';

import noteReducer from '../components/notes/reducer';
import authReducer from '../components/auth/reducer';
import profileReducer from '../components/profile/reducer';
export default combineReducers({
    note: noteReducer,
    auth: authReducer,
    profile: profileReducer
});