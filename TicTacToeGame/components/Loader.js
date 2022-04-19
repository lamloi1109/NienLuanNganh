import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'

export default class Loader extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { visible } = this.props
        return (
            <View style={styles.container}>
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,1)"
                    source={require('../99274-loading.json')}
                    animationStyle={styles.lottie}
                    speed={1}
                >
                    <Text style={{
                        color: 'black'
                    }}>Loading Game ...</Text>
                </AnimatedLoader>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
    container:{
      flex:1,
      justifyContent:  'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }
})
