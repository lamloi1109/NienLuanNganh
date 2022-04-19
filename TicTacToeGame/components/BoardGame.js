import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
export default class BoardGame extends React.Component {
    render() {
        let bgColor = 'black';
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity onPress={() => {
                        console.log(bgColor);
                        bgColor = 'black';  
                        console.log(bgColor);

                    }} style={{ margin: 5,marginRight: 2.5,marginTop: 5, marginBottom: 2.5, padding: 20,backgroundColor:'white'
                 }}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: bgColor}]} onPress={() => {
                        console.log("Dsadsa")
                        bgColor = 'white';  
                    }}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button }>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button }>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                       
                    </TouchableOpacity>
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
    },
    button: { margin: 5,marginRight: 2.5, marginTop: 5, marginBottom: 2.5, padding: 20,backgroundColor:'white',
}
})
