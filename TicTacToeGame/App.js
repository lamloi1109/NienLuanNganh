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
import SignUpScreen from './components/auth/SignUp'
import LoginScreen from './components/auth/Login'
import LoadingScreen from './components/Loader'
import GameScreen from './components/Game'
import Test from './components/Test'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import Toast from 'react-native-toast-notifications'
import { View, Text, BackHandler, Alert,StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers/index'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import NetInfo from '@react-native-community/netinfo'
const middleware = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, middleware)

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
const Stack = createNativeStackNavigator()
class App extends React.Component {
    // NetInfoSubscribtion = null
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            visible: true,
            connection_status: false,
        }
    }
    backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ])
        return true
    }
    componentWillUnmount() {
        if(this.backHandler !== undefined){
            this.backHandler.remove()

        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backAction)
        setInterval(() => {
            auth().onAuthStateChanged((user) => {
                if (!user) {
                    this.setState({
                        loggedIn: false,
                        loaded: true,
                        visible: !this.state.visible,
                    })
                } else {
                    this.setState({
                        loggedIn: true,
                        loaded: true,
                        visible: !this.state.visible,
                    })
                }
            })
        }, 3000)
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
                                options={{
                                    headerShown: false,
                                    headerTransparent: true,
                                }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerShown: false,
                                    headerTransparent: true,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Toast ref={(ref) => (global['toast'] = ref)} />
                </>
            )
        }
        return (
            <>
                <Provider store={store}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Main">
                            <Stack.Screen
                                name="Main"
                                component={MainScreen}
                                {...this.state}
                                options={{
                                    headerShown: false,
                                    headerTransparent: true,
                                }}
                            />
                            <Stack.Screen
                                name="VsMachine"
                                component={GameScreen}
                                options={{
                                    headerShown: false,
                                    headerTransparent: true,
                                }}
                            />
                            <Stack.Screen
                                name="Multiplay"
                                component={GameScreen}
                                options={{
                                    headerShown: false,
                                    headerTransparent: true,
                                }}
                            />
                             <Stack.Screen
                                name="Online"
                                component={Test}
                                options={{
                                    headerShown: false,
                                    headerTransparent: true,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
                <Toast ref={(ref) => (global['toast'] = ref)} />
            </>
        )
    }
}

export default App
