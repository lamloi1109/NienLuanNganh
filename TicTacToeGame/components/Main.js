import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
        console.log(this.props)
    }
    render() {
        const { currentUSer } = this.props
        console.log(this.props)
        if (currentUSer == undefined) {
            this.props.fetchUser()
            return (
                <View>
                    <Text>Undefined</Text>
                </View>
            )
        }
        return (
            <View>
                <Text>{this.props.name} is logged In</Text>
            </View>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUSer: store.userState.currentUSer 
})
const mapDispatchToProps = (dispatch) =>  bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
