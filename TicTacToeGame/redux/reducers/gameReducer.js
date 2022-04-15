import {SET_GAME_MODE, CONNECTION_STATUS_CHANGE} from '../contants/index'
const initializeState = {
    gameMode: null,
    connection_status: true,
}

export const gameReducer = (state = initializeState, action) => {
    switch(action.type){
           case SET_GAME_MODE: 
            return {
                ...state,
                gameMode: action.gameMode
            }
            case CONNECTION_STATUS_CHANGE: 
            return {
                ...state,
                connection_status: action.connection_status
            }     
        default:
            return state;
    }
}
