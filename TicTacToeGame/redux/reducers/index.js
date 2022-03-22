import { combineReducers } from "redux";
import {userReducer} from './userReducer';

const Reducers = combineReducers({
    userState: userReducer 
});

export default Reducers;
