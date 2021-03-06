import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Alert,
    BackHandler,
    Pressable,
    TouchableOpacity,
    Image,
} from 'react-native'
import socketIO from 'socket.io-client'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import BoardGame from './BoardGame'
import Loading from './Loader'
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            isWin: false,
            isCross: null,
            size: 8,
            socket: socketIO('http://10.3.74.129:5000', {
                transports: ['websocket'],
                jsonp: false,
            }),
            playerID: null,
            numberPlayer: null,
        }
        this.navigate = this.navigate.bind(this)
        // this.isWinner = this.isWinner.bind(this)
        // this.setBoard = this.setBoard.bind(this)
        this.drawMark = this.drawMark.bind(this)
        this.placeMark = this.placeMark.bind(this)
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    backAction = () => {
        Alert.alert('Quit Game ~~!', 'Are you sure you want to go back?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'YES',
                onPress: () => {
                    // this.state.socket.disconnect()
                    this.navigate('Main')
                },
            },
        ])
        return true
    }
    componentDidMount() {
        // let created = firestore().Time()
        // auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //     firestore()
        //         .collection('games')
        //         .add({
        //             player1, player2
        //         })
        //     } else {
        //         console.log('ko Dang nhap')
        //     }
        // })
        // this.processSocket(this.state.socket)
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction
        )
        this.state.socket.emit('join room', '1')
  
        this.setBoard(this.state.size)
    }

    setBoard(size = 8) {
        // Tao ma tran size*size
        // let board = []
        // for (let i = 0; i < size; i++) {
        //     let tmp = []
        //     for (let j = 0; j < size; j++) {
        //         tmp[j] = 0
        //     }
        //     board[i] = tmp
        // }
        // console.log(board)
        // this.setState({
        //     board,
        // })
        this.state.socket.emit('setBoard', this.state.size)
        this.state.socket.on('getBoard', (data) => {
            this.setState({
                board: data,
            })
        })
    }
    // processSocket(socket){
    //     socket.on('getNumberPlayer',(number) => {
    //         console.log(number)
    //         this.setState({
    //             numberPlayer: number
    //         })
    //   })
    // }
    componentWillUnmount() {
        this.backHandler.remove()
    }

    // isWinner(board, currentRow, currentCol, Value) {
    //     let count_left = 0
    //     let count_right = 0
    //     let count_up = 0
    //     let count_down = 0
    //     let count_right_up = 0
    //     let count_left_down = 0
    //     let count_right_down = 1
    //     let count_left_up = 0
    //     let isWin = false
    //     let temp1 = 0
    //     let temp2 = 1
    //     // Horizontal
    //     // Ki???m tra theo chi???u ngang t??? v??? tr?? hi???n t???i sang tr??i ho???c sang ph???i xem ????? ??i???u ki???n th???ng hay kh??ng
    //     // Ki???m tra t??? ph???i sang tr??i
    //     for (let i = currentCol; i >= 0; i--) {
    //         if (board[currentRow][i] === Value) {
    //             count_left++
    //         } else {
    //             break
    //         }
    //     }
    //     // Ki???m tra t??? tr??i sang ph???i
    //     for (let j = currentCol + 1; j < board.length; j++) {
    //         if (board[currentRow][j] === Value) {
    //             count_right++
    //         } else {
    //             break
    //         }
    //     }
    //     // Vertically
    //     // Ki???m tra theo chi???u d???c t??? v??? tr?? hi???n t???i l??n tr??n ho???c xu???ng d?????i xem c?? ????? ??i???u ki???n th???ng hay kh??ng
    //     // Ki???m tra ph??a d?????i
    //     for (let k = currentRow; k < board.length; k++) {
    //         if (board[k][currentCol] === Value) {
    //             count_down++
    //         } else {
    //             break
    //         }
    //     }
    //     // Ki???m tra ph??a tr??n
    //     for (let h = currentRow - 1; h >= 0; h--) {
    //         if (board[h][currentCol] === Value) {
    //             count_up++
    //         } else {
    //             break
    //         }
    //     }
    //     // Diagonal
    //     // Ki???m tra theo ph????ng ch??o tr??n b??n ph???i ho???c d?????i b??n tr??i xem c?? th???a ??i???u khi???n kh??ng
    //     // Ki???m tra ph??a tr??n b??n ph???i
    //     for (let l = currentRow; l >= 0; l--) {
    //         if (board[l][currentCol + temp1] === Value) {
    //             count_right_up++
    //             temp1++
    //         } else if (board[l][currentCol - temp1] === Value) {
    //             count_left_up++
    //             temp1++
    //         } else {
    //             break
    //         }
    //     }
    //     // Ki???m tra ph??a d?????i b??n tr??i
    //     for (let g = currentRow + 1; g < board.length; g++) {
    //         if (board[g][currentCol - temp2] === Value) {
    //             count_left_down++
    //             temp2++
    //         } else if (board[g][currentCol + temp2] === Value) {
    //             count_right_down++
    //             temp2++
    //         } else {
    //             break
    //         }
    //     }
    //     //

    //     // Ki???m tra ??i???u ki???n th???ng
    //     if (
    //         count_right + count_left >= 5 ||
    //         count_up + count_down >= 5 ||
    //         count_right_up + count_left_down >= 5 ||
    //         count_right_down + count_left_up >= 5
    //     ) {
    //         isWin = true
    //     }
    //     this.setState({
    //         isWin,
    //     })
    //     return isWin
    // }

    drawMark(board, currentRow, currentCol) {
        if (board[currentRow][currentCol] == 0 && !this.state.isWin) {
            if (this.state.isCross) {
                board[currentRow][currentCol] = 1
                this.setState({ isCross: !this.state.isCross })
                this.setState({
                    board,
                })
            } else {
                board[currentRow][currentCol] = 2
                this.setState({ isCross: !this.state.isCross })
                this.setState({
                    board,
                })
            }
        }
    }

    // resetGame(){
    //     this.setState({
    //         isCross: null,
    //         isWin: false,
    //         board: [],
    //         size: 8
    //     })
    //     this.setBoard(this.state.size)
    // }
    placeMark = (board, currentRow, currentCol) => {
        if (board.length > 0 && !this.state.isWin) {
            if (board[currentRow][currentCol] == 1)
                return (
                    <Image
                        source={require('../images/icons/cross.png')}
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                )
            else if (board[currentRow][currentCol] == 2)
                return (
                    <Image
                        source={require('../images/icons/circle.png')}
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                )
            return (
                <Image
                    source={require('../images/icons/blank.png')}
                    style={{
                        width: 40,
                        height: 40,
                    }}
                />
            )
        } else {
            console.log('error')
        }
    }
    render() {
        let countPlayer = 0;
        this.state.socket.on('getNumberPlayer', (number) => {
            countPlayer = number
            console.log('NUmber', countPlayer,'ID: ', this.state.socket.id)
        })
      
        // if (countPlayer < 2) {
        //     return (
        //         <View>
        //             <Text style={{
        //                 color:'black'
        //             }}>
        //                  {' ' + countPlayer}
        //             </Text>
        //         </View>
        //     )
        // }
        let gameMode = this.props.gameState.gameMode
        if (this.state.isCross === null) {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'gray',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundColor: '#97928B',
                    }}
                >
                    <View
                        style={{
                            margin: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                            }}
                        >
                            Choose turn X or O?
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isCross: false,
                                    firstTurn: false,
                                })
                            }}
                            style={{
                                backgroundColor: '#E9C0A7',
                                marginRight: 30,
                                padding: 20,
                                borderRadius: 30,
                            }}
                        >
                            <Image
                                source={require('../images/icons/circle.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isCross: true,
                                    firstTurn: true,
                                })
                            }}
                            style={{
                                backgroundColor: '#E9C0A7',
                                padding: 20,
                                borderRadius: 30,
                            }}
                        >
                            <Image
                                source={require('../images/icons/cross.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
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
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    showHideTransition={true}
                    hidden={true}
                />
                {this.state.isWin ? (
                    <>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}
                            >
                                {this.state.isCross ? 'O' : 'X'} Win
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.navigate('Main')
                                    }}
                                    style={{
                                        backgroundColor: '#E9C0A7',
                                        padding: 20,
                                        margin: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                        }}
                                    >
                                        Back
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.resetGame()
                                    }}
                                    style={{
                                        backgroundColor: '#E9C0A7',
                                        padding: 20,
                                        margin: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                        }}
                                    >
                                        Again
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <View>
                            <View
                                style={{
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    padding: 10,
                                    marginTop: 20,
                                }}
                            >
                                <Image
                                    source={require('../images/avatars/dentist.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 30,
                                        marginRight: 10,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    PLAYER 1
                                </Text>
                                <>
                                    {this.state.firstTurn ? (
                                        <Image
                                            source={require('../images/icons/cross.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../images/icons/circle.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    )}
                                </>
                            </View>
                            <BoardGame
                                isCross={this.state.isCross}
                                board={this.state.board}
                                placeMark={this.placeMark}
                                drawMark={this.drawMark}
                                isWinner={this.isWinner}
                                mode={gameMode}
                                socket={this.state.socket}
                            />
                            <View
                                style={{
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    padding: 10,
                                    marginBottom: 20,
                                }}
                            >
                                <Image
                                    source={require('../images/avatars/dentist.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 30,
                                        marginRight: 10,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    PLAYER 2
                                </Text>
                                <>
                                    {this.state.firstTurn ? (
                                        <Image
                                            source={require('../images/icons/circle.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../images/icons/cross.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    )}
                                </>
                            </View>
                        </View>
                    </>
                )}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { userState: state.userState, gameState: state.gameState }
}
export default connect(mapStateToProps, null)(Test)
