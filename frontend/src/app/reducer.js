import {combineReducers} from 'redux';

import noteReducer from '../components/notes/reducer';
import authReducer from '../components/auth/reducer';

export default combineReducers({
    note: noteReducer,
    auth: authReducer
});