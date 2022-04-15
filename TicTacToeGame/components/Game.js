import React from 'react'
import { View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getGameMode } from '../redux/actions/index'
import BoardGame from './BoardGame'
class Game extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let gameMode = this.props.gameState.gameMode

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <BoardGame />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { gameState: state.gameState }
}
export default connect(mapStateToProps, null)(Game)
