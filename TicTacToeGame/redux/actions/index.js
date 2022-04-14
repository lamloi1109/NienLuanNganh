import firebase from '@react-native-firebase/app'
import { USER_STATE_CHANGE,SET_GAME_MODE, GET_GAME_MODE  } from '../contants/index'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
export function fetchUser() {
    return (dispatch, getState) => {
        const stateBefore = getState()
        // console.log(stateBefore);
        firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: { uid: auth().currentUser.uid, ...snapshot.data() }
                })
            } else{
                console.log('does not exist')
            }
        })
        const stateAfter = getState()
        // console.log(stateAfter);
    }
}


export function setGameMode(gameMode) {
    return (dispatch, getState) => {
        const stateBefore = getState()
        // console.log(stateBefore);
        dispatch({
            type: SET_GAME_MODE,
            gameMode: gameMode
        })
        const stateAfter = getState()
        // console.log(stateAfter);
    }
}