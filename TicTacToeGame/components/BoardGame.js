import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
var board = [
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
]
export default class BoardGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCross: true,
        }
    }
    drawItem(number) {
        if (board[number] == 'question') {
            if (this.state.isCross) board[number] = 'cross'
            else board[number] = 'circle'
            this.setState({ isCross: !this.state.isCross })
        }
        console.log(board)
    }
    chooseItemColor = (number) => {
        if (board[number] == 'cross') return 'black'
        else if (board[number] == 'circle') return '#45CE30'
        return 'white'
    }
    render() {
        let bgColor = 'black'
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity
                        onPress={() => this.drawItem(0)}
                        style={{
                            margin: 5,
                            marginRight: 2.5,
                            marginTop: 5,
                            marginBottom: 2.5,
                            padding: 20,
                            backgroundColor: 'white',
                        }}
                    ></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => {
                            console.log('Dsadsa')
                        }}
                    ></TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon
                            name="cross"
                            size={30}
                            style={{
                                color: 'black',
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                    <TouchableOpacity style={styles.button}></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 5,
        marginRight: 2.5,
        marginTop: 5,
        marginBottom: 2.5,
        padding: 20,
        backgroundColor: 'white',
    },
})
