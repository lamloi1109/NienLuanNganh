import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
export default class BoardGame extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let board = this.props.board
        const socket = this.props.socket
        let rowMaps = board.map((elementRow, indexRow) => {
            return (
                <View
                    style={{ flexDirection: 'row', backgroundColor: 'gray' }}
                    key={indexRow}
                >
                    {elementRow.map((elementCol, indexCol) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.drawMark(
                                        board,
                                        indexRow,
                                        indexCol
                                    )
                                    this.props.isWinner(
                                        board,
                                        indexRow,
                                        indexCol,
                                        board[indexRow][indexCol],
                                        this.props.sizeAlign
                                    )
                                    this.props.checkDraw(board)
                                }}
                                key={indexCol}
                                style={styles.button}
                            >
                                {this.props.placeMark(
                                    board,
                                    indexRow,
                                    indexCol,
                                    this.props.sizeMark
                                )}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        })
        if(this.props.mode === "Online"){
            rowMaps = board.map((elementRow, indexRow) => {
                return (
                    <View
                        style={{ flexDirection: 'row', backgroundColor: 'gray' }}
                        key={indexRow}
                    >
                        {elementRow.map((elementCol, indexCol) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.drawMark(
                                            board,
                                            indexRow,
                                            indexCol
                                        )
                                        socket.emit('sendBoardData',board)
                                        // this.props.isWinner(
                                        //     board,
                                        //     indexRow,
                                        //     indexCol,
                                        //     board[indexRow][indexCol]
                                        // )
                                    }}
                                    key={indexCol}
                                    style={styles.button}
                                >
                                    {this.props.placeMark(
                                        board,
                                        indexRow,
                                        indexCol
                                    )}
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )
            })
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {rowMaps.map((element) => {
                    return element
                })}
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
    },
    icons: {
        width: 30,
        height: 30,
    },
    mark: {
        borderWidth: 1,
        borderColor: 'black',
    },
})
