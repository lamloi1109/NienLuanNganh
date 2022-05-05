import firebase from '@react-native-firebase/app'
import { USER_STATE_CHANGE,SET_GAME_MODE, CONNECTION_STATUS_CHANGE,SET_BOARD_GAME, SET_SIZE_MARK, VOLUME_STATE_CHANGE  } from '../contants/index'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
export function fetchUser() {
    return (dispatch, getState) => {
        const stateBefore = getState()
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
    }
}


export function setGameMode(gameMode) {
    return (dispatch, getState) => {
        const stateBefore = getState()
        dispatch({
            type: SET_GAME_MODE,
            gameMode: gameMode
        })
        const stateAfter = getState()
    }
}

export function setBoardGame(Board) {
    return (dispatch, getState) => {
        const stateBefore = getState()
        console.log("SET BOARD")
        dispatch({
            type: SET_BOARD_GAME,
            board: Board
        })

        const stateAfter = getState()
        console.log(stateAfter)

    }
}

export function setSizeMark(sizeMark) {
    return (dispatch, getState) => {
        const stateBefore = getState()
        console.log("SET BOARD")
        dispatch({
            type: SET_SIZE_MARK,
            sizeMark: sizeMark
        })

        const stateAfter = getState()
        console.log(stateAfter)

    }
}


export function setVolumeStatus(isEnableVolume) {
    return (dispatch, getState) => {
        const stateBefore = getState()
        console.log("SET BOARD")
        dispatch({
            type: VOLUME_STATE_CHANGE,
            isEnableVolume: isEnableVolume
        })

        const stateAfter = getState()
        console.log(stateAfter)

    }
}

export function connectionStatusChange(connection_status) {
    return (dispatch, getState) => {
        const stateBefore = getState()
        dispatch({
            type: CONNECTION_STATUS_CHANGE,
            connection_status: connection_status
        })
        const stateAfter = getState()
    }
}