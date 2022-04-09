/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './components/Main'
import SignUpScreen from './components/SignUp'
import LoginScreen from './components/Login'
import LoadingScreen from './components/Loader'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import Toast from 'react-native-toast-notifications'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers/index'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, middleware);

const firebaseConfig = {
    apiKey: 'AIzaSyDcOkNIB1vgkTXelGALveeE5-Ez7TYcnH0',
    authDomain: 'tictactoe-783b5.firebaseapp.com',
    projectId: 'tictactoe-783b5',
    storageBucket: 'tictactoe-783b5.appspot.com',
    messagingSenderId: '1010106021492',
    appId: '1:1010106021492:web:7c3f30a58115d37fa24321',
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}
console.log(store.getState())
const Stack = createNativeStackNavigator()
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            visible: true
        }
    }
    componentDidMount() {
        setInterval(() => {
            auth().onAuthStateChanged((user) => {
                if (!user) {
                    this.setState({
                        loggedIn: false,
                        loaded: true,
                        visible: !this.state.visible
                    })
                } else {
                    this.setState({
                        loggedIn: true,
                        loaded: true,
                        visible: !this.state.visible
                    })
                }
            })
            
          }, 3000);
        
    }
    render() {
        const { loggedIn, loaded, visible } = this.state
        if (!loaded) {
            return (
                <View>
                    <LoadingScreen visible={visible} />
                </View>
            )
        }
        if (!loggedIn) {
            return (
                <>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Login">
                            <Stack.Screen
                                name="SignUp"
                                component={SignUpScreen}
                            />
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                            />
                            {/* <Stack.Screen name="Main" component={MainScreen} /> */}
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Toast ref={(ref) => (global['toast'] = ref)} />
                </>
            )
        }
        return (
               <Provider store={store} >
                  <MainScreen/>
               </Provider>
        )
    }
}

export default App
