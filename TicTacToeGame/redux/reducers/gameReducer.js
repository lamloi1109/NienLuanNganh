import {SET_GAME_MODE, CONNECTION_STATUS_CHANGE, ROOMS_STATE_CHANGE} from '../contants/index'
const initializeState = {
    gameMode: null,
    connection_status: true,
    rooms: []
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
            case ROOMS_STATE_CHANGE: 
            return {
                ...state,
                rooms_status: action.rooms_status
            }
        default:
            return state;
    }
}
