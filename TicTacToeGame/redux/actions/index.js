import firebase from '@react-native-firebase/app'
import {USER_STATE_CHANGE} from '../contants/index'
import firestore from '@react-native-firebase/firestore';

export function fetchUser(){
    return((dispatch) => {
        firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    console.log(snapshot.data());
                    dispatch({
                        type: USER_STATE_CHANGE,
                        currentUser: snapshot.data() 
                    })
                } else{
                    console.log('does not exist')
                }
            })
    })
}