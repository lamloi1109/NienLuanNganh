import { combineReducers } from "redux";
import { gameReducer } from "./gameReducer";
import {userReducer} from './userReducer';

const Reducers = combineReducers({
    userState: userReducer,
    gameState: gameReducer
});

export default Reducers;
