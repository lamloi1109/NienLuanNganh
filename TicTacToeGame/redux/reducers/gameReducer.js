import {SET_GAME_MODE, CONNECTION_STATUS_CHANGE, ROOMS_STATE_CHANGE, SET_BOARD_GAME} from '../contants/index'
const initializeState = {
    gameMode: null,
    connection_status: true,
    rooms: [],
    board: {
        sizeBoard: 8,
        sizeAlign: 5
    }
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
            case SET_BOARD_GAME: 
            return {
                ...state,
                board: action.board
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
