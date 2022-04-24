import React from 'react'
import { View, Text, StatusBar, Alert,BackHandler  } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getGameMode } from '../redux/actions/index'
import BoardGame from './BoardGame'
class Game extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
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
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }
    render() {
        let gameMode = this.props.gameState.gameMode

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
                <BoardGame />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { gameState: state.gameState }
}
export default connect(mapStateToProps, null)(Game)
