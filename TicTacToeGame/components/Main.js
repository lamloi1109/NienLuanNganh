import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
export class Main extends Component {
  componentDidMount(){
    this.props.fetchUser()
    console.log(this.props)
  }
  render() {
    const {currentUSer} = this.props;
    if(currentUSer == undefined){
      return(
        <View>

        </View>
      )
    }
    return (
     <View>
       <Text>
          {currentUSer.name} is logged In
       </Text>
     </View>
    )
  }
}
const mapStateToProps = (store) => (
  {
  // currentUSer: store.userState
  currentUSer: store.user
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser},dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main)
