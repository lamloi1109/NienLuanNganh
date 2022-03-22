import firebase from '@react-native-firebase/app'
import {USER_STATE_CHANGE} from '../contants/index'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
export function fetchUser() {
    return((dispatch) => {  
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
    })
}