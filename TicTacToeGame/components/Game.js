import React from 'react'
import {
    View,
    Text,
    StatusBar,
    Alert,
    BackHandler,
    Pressable,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGameResult } from '../redux/actions/index'
import BoardGame from './BoardGame'
class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            isWin: false,
            isDraw: false,
            isCross: null,
            size: this.props.gameState.board.sizeBoard,
            sizeAlign: this.props.gameState.board.sizeAlign,
            modalVisible: false,
            Opacity: 1,
        }
        this.navigate = this.navigate.bind(this)
        this.isWinner = this.isWinner.bind(this)
        this.setBoard = this.setBoard.bind(this)
        this.drawMark = this.drawMark.bind(this)
        this.placeMark = this.placeMark.bind(this)
        this.checkDraw = this.checkDraw.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
    }
    backAction = () => {
        Alert.alert('Quit Game ~~!', 'Are you sure you want to go back?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => this.navigate('Main') },
        ])
        return true
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction
        )
        this.setBoard(this.state.size)
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }
    setBoard(size = 8) {
        // Tao ma tran size*size
        let board = []
        for (let i = 0; i < size; i++) {
            let tmp = []
            for (let j = 0; j < size; j++) {
                tmp[j] = 0
            }
            board[i] = tmp
        }
        console.log(board)
        this.setState({
            board,
        })
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    isWinner(board, currentRow, currentCol, Value, sizeAlign) {
        let count_left = 0
        let count_right = 0
        let count_up = 0
        let count_down = 0
        let count_right_up = 0
        let count_left_down = 0
        let count_right_down = 1
        let count_left_up = 0
        let isWin = false
        let temp1 = 0
        let temp2 = 1
        // Horizontal
        // Ki???m tra theo chi???u ngang t??? v??? tr?? hi???n t???i sang tr??i ho???c sang ph???i xem ????? ??i???u ki???n th???ng hay kh??ng
        // Ki???m tra t??? ph???i sang tr??i
        for (let i = currentCol; i >= 0; i--) {
            if (board[currentRow][i] === Value) {
                count_left++
            } else {
                break
            }
        }
        // Ki???m tra t??? tr??i sang ph???i
        for (let j = currentCol + 1; j < board.length; j++) {
            if (board[currentRow][j] === Value) {
                count_right++
            } else {
                break
            }
        }
        // Vertically
        // Ki???m tra theo chi???u d???c t??? v??? tr?? hi???n t???i l??n tr??n ho???c xu???ng d?????i xem c?? ????? ??i???u ki???n th???ng hay kh??ng
        // Ki???m tra ph??a d?????i
        for (let k = currentRow; k < board.length; k++) {
            if (board[k][currentCol] === Value) {
                count_down++
            } else {
                break
            }
        }
        // Ki???m tra ph??a tr??n
        for (let h = currentRow - 1; h >= 0; h--) {
            if (board[h][currentCol] === Value) {
                count_up++
            } else {
                break
            }
        }
        // Diagonal
        // Ki???m tra theo ph????ng ch??o tr??n b??n ph???i ho???c d?????i b??n tr??i xem c?? th???a ??i???u khi???n kh??ng
        // Ki???m tra ph??a tr??n b??n ph???i
        for (let l = currentRow; l >= 0; l--) {
            if (board[l][currentCol + temp1] === Value) {
                count_right_up++
                temp1++
            } else if (board[l][currentCol - temp1] === Value) {
                count_left_up++
                temp1++
            } else {
                break
            }
        }
        // Ki???m tra ph??a d?????i b??n tr??i
        for (let g = currentRow + 1; g < board.length; g++) {
            if (board[g][currentCol - temp2] === Value) {
                count_left_down++
                temp2++
            } else if (board[g][currentCol + temp2] === Value) {
                count_right_down++
                temp2++
            } else {
                break
            }
        }
        //

        // Ki???m tra ??i???u ki???n th???ng
        if (
            count_right + count_left >= sizeAlign ||
            count_up + count_down >= sizeAlign ||
            count_right_up + count_left_down >= sizeAlign ||
            count_right_down + count_left_up >= sizeAlign
        ) {
            isWin = true
            if(this.state.isCross){
                let Result = this.props.gameState.Result
                Result.Xwins = Result.Xwins + 1
                this.props.setGameResult(Result)
            } else{
                let Result = this.props.gameState.Result
                Result.Owins = Result.Owins + 1
                this.props.setGameResult(Result)
            }
            this.state.Opacity = 0.75
            this.setModalVisible(isWin)

            console.log('WINNN')
        }
        this.setState({
            isWin,
        })
        return isWin
    }
    checkDraw(board) {
        if (this.state.win === true) {
            return false
        }
        let sum = 0
        let size = board.length * board.length
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j]) {
                    sum = sum + 1
                }
            }
        }
        console.log(sum, size)
        if (sum === size) {
            console.log('DRAWWW')
            this.state.Opacity = 0.75
            this.setModalVisible(true)
            let Result = this.props.gameState.Result
            Result.Draw = Result.Draw + 1
            this.props.setGameResult(Result)
            return true
        }
        return false
    }
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
    resetGame() {
        this.setState({
            board: [],
            isWin: false,
            isDraw: false,
            isCross: null,
            size: this.props.gameState.board.sizeBoard,
            sizeAlign: this.props.gameState.board.sizeAlign,
            modalVisible: false,
            Opacity: 1
        })
        this.setBoard(this.state.size)
    }
    placeMark = (board, currentRow, currentCol, sizeMark) => {
        if (board.length > 0 ) {
            if (board[currentRow][currentCol] == 1)
                return (
                    <Image
                        source={require('../images/icons/cross.png')}
                        style={{
                            width: sizeMark,
                            height: sizeMark,
                            tintColor: !this.state.isCross ? 'red' : 'white'
                        }}
                    />
                )
            else if (board[currentRow][currentCol] == 2)
                return (
                    <Image
                        source={require('../images/icons/circle.png')}
                        style={{
                            width: sizeMark,
                            height: sizeMark,
                            tintColor: this.state.isCross ? 'red' : 'white'
                        }}
                    />
                )
            return (
                <Image
                    source={require('../images/icons/blank.png')}
                    style={{
                        width: sizeMark,
                        height: sizeMark,
                        tintColor: '#2B2B2B'
                    }}
                />
            )
        }
    }

    render() {
        const { modalVisible } = this.state
        console.log("Result",this.props.gameState.Result)
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
                            Player1 choose turn X or O?
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
                        sizeAlign={this.state.sizeAlign}
                        sizeMark={this.props.gameState.sizeMark}
                        checkDraw={this.checkDraw}
                        isEnableVolume={this.props.gameState.isEnableVolume}
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
                    <View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.')
                                this.setModalVisible(!modalVisible)
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    marginBottom: 100
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5
                                    }}
                                >
                                    {this.state.isWin === true &&
                                    this.state.isDraw === false ? (
                                        <>
                                            <Text
                                                style={{
                                                    fontSize: 30,
                                                    color: 'black',
                                                }}
                                            >
                                                {this.state.isCross ? 'O' : 'X'}
                                                Win
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text
                                                style={{
                                                    fontSize: 30,
                                                    color: 'black',
                                                }}
                                            >
                                                DRAW
                                            </Text>
                                        </>
                                    )}

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
                                                backgroundColor: 'black',
                                                padding: 20,
                                                margin: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
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
                                                backgroundColor: '#2A75F3',
                                                padding: 20,
                                                margin: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                }}
                                            >
                                                Again
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { gameState: state.gameState }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        { setGameResult },
        dispatch
    )
export default connect(mapStateToProps, mapDispatchToProps)(Game)
