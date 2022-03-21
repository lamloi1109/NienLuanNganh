const initializeState = {
    currentUser: null
}

const user = (state = initializeState, action) => {
    return{
        ...state,
        currentUser: action.currentUser
    }
}

export default user;