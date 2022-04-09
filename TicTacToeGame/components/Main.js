import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }
    render() {        
        const { userState } = this.props;
        let userName = "";
        if(userState.currentUser != null){
            userName = userState.currentUser.name;
            console.log(userName);
        }   
        if(userState === undefined){
            return(
                <View>
            </View>
            )
        }
        return (
            <View>
                <Text>{userName} is logged In</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.userState);
    return { userState: state.userState }
}

const mapDispatchToProps = (dispatch) =>  bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
