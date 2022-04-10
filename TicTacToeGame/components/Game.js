import React from 'react'
import { View, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getGameMode } from '../redux/actions/index'
class Game extends React.Component {
    componentDidMount() {
       this.props.getGameMode();
    }
    render() {
      let gameMode = this.props.gameState;
      console.log(gameMode);
        return (
            <View>
                <Text>VsMachine</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.gameState)
    return { gameState: state.gameState }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ getGameMode }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Game)
