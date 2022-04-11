import React from 'react'
import { View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getGameMode } from '../redux/actions/index'
class Game extends React.Component {
    render() {
       let gameMode = this.props.gameState.gameMode;

        return (
            <View>
                <Text>{gameMode}</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { gameState: state.gameState }
}
export default connect(mapStateToProps, null)(Game)
