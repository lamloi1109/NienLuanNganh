import React, { Component } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
class GameResult extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>GAME RESULT</Text>
                <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderColor: 'white',
                      borderWidth: 2
                }}>
                    <Text style={styles.text}>Xwins: {this.props.gameState.Result.Xwins}</Text>
                    <Text style={styles.text}>Owins: {this.props.gameState.Result.Owins}</Text>
                    <Text style={styles.text}>Draw: {this.props.gameState.Result.Draw}</Text>
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
        backgroundColor: 'gray',
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 22,
        margin: 20,
    },
    textTitle: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 22,
        margin: 20,
    },

})
function mapStateToProps(state) {
    return { gameState: state.gameState }
}

export default connect(mapStateToProps, null)(GameResult)
