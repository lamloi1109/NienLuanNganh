import React, { Component } from 'react'
import { View, Text,Pressable } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser,setGameMode } from '../redux/actions/index'

class Main extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }
    navigate(txt) {
        this.props.navigation.navigate(txt);
    }
    componentDidMount() {
        console.log(this.props);
        this.props.fetchUser()
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>Welcome to our Home Screen</Text>
                <Pressable
                    onPress={() => {
                        this.props.setGameMode('VsMachine');
                        this.navigate('VsMachine');
                    }}
                    style={{
                        backgroundColor: 'plum',
                        padding: 10,
                        marginBottom: 10,
                        marginTop: 10,
                    }}
                >
                    <Text>Vs Machine</Text>
                </Pressable>
                <Pressable
                    onPress={() => this.navigate('Multiplay')}
                    style={{ backgroundColor: 'plum', padding: 10 }}
                >
                    <Text>Multiplay</Text>
                </Pressable>
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.userState)
    return { userState: state.userState,
    gameState: state.gameState
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, setGameMode }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Main)
