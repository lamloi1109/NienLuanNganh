import React from 'react'
import { View, Text, TouchableOpacity, Entypo } from 'react-native'
export default class BoardGame extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View style={{ flexDirection: 'row', backgroundColor:'black' }}>
                <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>  
                        
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                       
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row',backgroundColor:'black' }}>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 30, padding: 20,backgroundColor:'white' }}>
                       
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
