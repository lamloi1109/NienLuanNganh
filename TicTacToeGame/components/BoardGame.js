import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
export default class BoardGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCross: true,
            board: [],
            size: 8,
            isWin: false,
        }
    }
    componentDidMount() {
        this.setBoard(this.state.size)
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
    isWin(board, currentRow, currentCol, Value) {
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
        // Kiểm tra theo chiều ngang từ vị trí hiện tại sang trái hoắc sang phải xem đủ điều kiện thắng hay không
        // Kiểm tra từ phải sang trái
        for (let i = currentCol; i >= 0; i--) {
            if (board[currentRow][i] === Value) {
                count_left++
            } else {
                break
            }
        }
        // Kiểm tra từ trái sang phải
        for (let j = currentCol + 1; j < board.length; j++) {
            if (board[currentRow][j] === Value) {
                count_right++
            } else {
                break
            }
        }
        // Vertically
        // Kiểm tra theo chiều dọc từ vị trí hiện tại lên trên hoặc xuống dưới xem có đủ điều kiện thắng hay không
        // Kiểm tra phía dưới
        for (let k = currentRow; k < board.length; k++) {
            if (board[k][currentCol] === Value) {
                count_down++
            } else {
                break
            }
        }
        // Kiểm tra phía trên
        for (let h = currentRow - 1; h >= 0; h--) {
            if (board[h][currentCol] === Value) {
                count_up++
            } else {
                break
            }
        }
        // Diagonal
        // Kiểm tra theo phương chéo trên bên phải hoặc dưới bên trái xem có thỏa điều khiện không
        // Kiểm tra phía trên bên phải
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
        // Kiểm tra phía dưới bên trái
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
        //
        //

        // Kiểm tra điều kiện thắng
        if (
            count_right + count_left >= 5 ||
            count_up + count_down >= 5 ||
            count_right_up + count_left_down >= 5 ||
            count_right_down + count_left_up >= 5
        ) {
            isWin = true
        }
        console.log('X IS win: ', isWin)
        this.setState({
            isWin,
        })
        return isWin
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
                console.log(this.state.board)
            }
        }
    }
    placeMark = (board, currentRow, currentCol) => {
        if (board.length > 0 && !this.state.isWin) {
            if (board[currentRow][currentCol] == 1)
                return (
                    <Image
                        source={require('../images/icons/cross.png')}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                )
            else if (board[currentRow][currentCol] == 2)
                return (
                    <Image
                        source={require('../images/icons/circle.png')}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                )
            return (
                <Image
                    source={require('../images/icons/blank.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
            )
        }
    }

    render() {
        let board = this.state.board
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
                                    this.drawMark(board, indexRow, indexCol)
                                    this.isWin(
                                        board,
                                        indexRow,
                                        indexCol,
                                        board[indexRow][indexCol]
                                    )
                                }}
                                key={indexCol}
                                style={styles.button}
                            >
                                {this.placeMark(board, indexRow, indexCol)}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        })
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
                    <TouchableOpacity
                        onPress={() => {
                            this.setBoard(this.state.size)
                            this.setState({
                                isWin: !this.state.isWin,
                            })
                        }}
                        style={styles.button}
                    >
                        <Text>Reset</Text>
                    </TouchableOpacity>
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
