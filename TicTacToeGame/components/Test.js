import React, { Component } from 'react'
import { View, Text } from 'react-native'
import socketIO from 'socket.io-client'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

class Test extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let created = firestore().timeStamp()
        let player1 = '1'
        let player2 = '2'
        auth().onAuthStateChanged(function (user) {
            if (user) {
            firestore()
                .collection('games')
                .add({
                    created, player1, player2
                })
            } else {
                console.log('ko Dang nhap')
            }
        })
        const socket = socketIO('http://10.3.74.109:5000', {
            transports: ['websocket'],
            jsonp: false,
        })
        socket.connect()
        socket.on('connect', () => {
            console.log('connected to socket server')
        })
        socket.emit('users', 'user123', {
            id: 1,
            name: 'Edsad',
        })
        socket.emit('join room', 'freetutsRoom')
    }
    render() {
        let isFull = false
        let player = [1, 2]

        return (
            <View>
                <Text>Text Socket</Text>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return { userState: state.userState, gameState: state.gameState }
}
export default connect(mapStateToProps, null)(Test)
