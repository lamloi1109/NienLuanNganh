import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from '@react-native-picker/picker'
import { bindActionCreators } from 'redux'
import { setBoardGame } from '../redux/actions/index'
class BoardSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: {
                sizeBoard: this.props.gameState.board.sizeBoard,
                sizeAlign: this.props.gameState.board.sizeAlign,
            },
        }
        this.setSelectedSizeBoard = this.setSelectedSizeBoard.bind(this)
        this.setSelectedSizeAlign = this.setSelectedSizeAlign.bind(this)

        this.navigate = this.navigate.bind(this)
    }
    setSelectedSizeBoard(value) {
        switch (value) {
            case 10:
            case 9:
            case 8:
            case 7:
            case 6:
            case 5:
            case 4:
                this.setState({
                    board: {
                        sizeBoard: value,
                        sizeAlign: 4,
                    },
                })
                return;
            case 3:
                this.setState({
                    board: {
                        sizeBoard: value,
                        sizeAlign: 3,
                    },
                })
                return;
            default:
                this.setState({
                    board: {
                        sizeBoard: value,
                        sizeAlign: this.state.board.sizeAlign,
                    },
                })
                return;
            
        }
    }
    setSelectedSizeAlign(value) {
        console.log('Value', value)
        this.setState({
            board: {
                sizeBoard: this.state.board.sizeBoard,
                sizeAlign: value,
            },
        })
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    choseItemPicker(size) {
        switch (size) {
            case 10:
            case 9:
            case 8:
            case 7:
            case 6:
                return (
                    <Picker
                        selectedValue={this.state.board.sizeAlign}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setSelectedSizeAlign(itemValue)
                        }
                        mode={'dropdown'}
                    >
                        <Picker.Item label="Size Board: 4" value={4} />
                        <Picker.Item label="Size Align: 5" value={5} />
                        <Picker.Item label="Size Align: 6" value={6} />
                    </Picker>
                )
            case 5:
                return (
                    <Picker
                        selectedValue={this.state.board.sizeAlign}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setSelectedSizeAlign(itemValue)
                        }
                        mode={'dropdown'}
                    >
                        <Picker.Item label="Size Align: 4" value={4} />
                        <Picker.Item label="Size Align: 5" value={5} />
                    </Picker>
                )
            case 4:
                return (
                    <Picker
                        selectedValue={this.state.board.sizeAlign}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setSelectedSizeAlign(itemValue)
                        }
                        mode={'dropdown'}
                    >
                        <Picker.Item label="Size Align: 4" value={4} />
                    </Picker>
                )
            case 3:
                return (
                    <Picker
                        selectedValue={this.state.board.sizeAlign}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setSelectedSizeAlign(itemValue)
                        }
                        mode={'dropdown'}
                    >
                        <Picker.Item label="Size Align: 3" value={3} />
                    </Picker>
                )
        }
    }
    render() {
        console.log(this.state.board)
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Select Board</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.board.sizeBoard}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setSelectedSizeBoard(itemValue)
                        }
                        mode={'dropdown'}
                    >
                        <Picker.Item label="Size Board: 10x10" value={10} />
                        <Picker.Item label="Size Board: 9x9" value={9} />
                        <Picker.Item label="Size Board: 8x8" value={8} />
                        <Picker.Item label="Size Board: 7x7" value={7} />
                        <Picker.Item label="Size Board: 6x6" value={6} />
                        <Picker.Item label="Size Board: 5x5" value={5} />
                        <Picker.Item label="Size Board: 4x4" value={4} />
                        <Picker.Item label="Size Board: 3x3" value={3} />
                    </Picker>
                </View>
                <Text style={styles.text}>Select Align</Text>
                <View style={styles.picker}>
                    {this.choseItemPicker(this.state.board.sizeBoard)}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.setBoardGame(this.state.board)
                        this.navigate('Main')
                    }}
                    style={styles.button}
                >
                    <Text>OK</Text>
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
        backgroundColor: 'white',
    },
    button: {
        margin: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'gray',
        borderRadius: 3,
    },
    picker: {
        borderColor: 'black',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 22,
        margin: 20,
    },
})
function mapStateToProps(state) {
    return { userState: state.userState, gameState: state.gameState }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ setBoardGame }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BoardSettings)
