import {USER_STATE_CHANGE} from '../contants/index'
const initializeState = {
    currentUser: null
}

export const userReducer = (state = initializeState, action) => {
    switch(action.type){
        case USER_STATE_CHANGE: 
            console.log(action);
            return {
                ...state,
                currentUser: action.currentUser
            }
        default:
            return state    
    }
}
