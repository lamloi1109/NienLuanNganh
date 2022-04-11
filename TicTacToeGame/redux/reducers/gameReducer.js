import {SET_GAME_MODE, GET_GAME_MODE} from '../contants/index'
const initializeState = {
    gameMode: null
}

export const gameReducer = (state = initializeState, action) => {
    switch(action.type){
           case SET_GAME_MODE: 
            console.log(action);
            return {
                ...state,
                gameMode: action.gameMode
            }     
        default:
            return state;
    }
}
