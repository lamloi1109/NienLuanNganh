import React, { Component } from 'react'
import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, setGameMode } from '../redux/actions/index'
import Icon from 'react-native-vector-icons/Ionicons'

class Main extends Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    componentDidMount() {
        console.log(this.props)
        this.props.fetchUser()
    }

    render() {
        let userName = ''

        if (this.props.userState.currentUser === null) {
            return <View></View>
        } else {
            userName = this.props.userState.currentUser.name
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >
                
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 5,
                    }}
                >
                    <Pressable
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 50,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 0.43,
                            shadowRadius: 9.51,
                            elevation: 15,
                            padding: 6,
                            marginBottom: 10,
                            marginTop: 10,
                            marginLeft: 10,
                        }}
                    >
                        <Icon name="settings-outline" size={30} />
                    </Pressable>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1649217707439-eb9ca4e9c62f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80',
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            borderColor: 'white',
                            borderWidth: 2,
                            marginRight: 10,
                        }}
                    />
                </View>
                <View
                    style={{
                        marginBottom: 50
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 30,
                            color: '#B9B9BB',
                        }}
                    >
                        Hello,
                        <Text
                            style={{
                                color: '#263034',
                            }}
                        >
                            {' ' + userName}
                        </Text>
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            padding: 5,
                        }}
                    >
                        <ImageBackground
                            source={{
                                uri: 'https://phunugioi.com/wp-content/uploads/2021/11/Background-de-thuong-hoat-hinh.jpg',
                            }}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                width: 150,
                                height: 150,
                                borderRadius: 20,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.3,
                                marginRight: 10,
                                elevation: 13,
                            }}
                        >
                            <Pressable
                                style={{
                                    zIndex: 1,
                                    width: '100%',
                                    height: '100%',
                                }}
                                onPress={() => {
                                    this.props.setGameMode('VsMachine')
                                    this.navigate('VsMachine')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Vs Machine
                                </Text>
                            </Pressable>
                        </ImageBackground>

                        <ImageBackground
                            source={{
                                uri: 'https://img6.thuthuatphanmem.vn/uploads/2022/02/12/background-chat-luong-cho-powerpoint_100426266.jpg',
                            }}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                width: 150,
                                height: 150,
                                borderRadius: 20,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.3,

                                elevation: 13,
                            }}
                        >
                            <Pressable
                                style={{
                                    zIndex: 1,
                                    width: '100%',
                                    height: '100%',
                                }}
                                onPress={() => {
                                    this.props.setGameMode('Multiplay')
                                    this.navigate('Multiplay')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Multiplay
                                </Text>
                            </Pressable>
                        </ImageBackground>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 5,
                        }}
                    >
                        <ImageBackground
                            source={{
                                uri: 'https://phunugioi.com/wp-content/uploads/2021/11/Background-de-thuong-hoat-hinh.jpg',
                            }}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                width: 150,
                                height: 150,
                                borderRadius: 20,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.3,
                                marginRight: 10,
                                elevation: 13,
                            }}
                        >
                            <Pressable
                                style={{
                                    zIndex: 1,
                                    width: '100%',
                                    height: '100%',
                                }}
                                onPress={() => {
                                    this.props.setGameMode('VsMachine')
                                    this.navigate('VsMachine')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Vs Machine
                                </Text>
                            </Pressable>
                        </ImageBackground>

                        <ImageBackground
                            source={{
                                uri: 'https://img6.thuthuatphanmem.vn/uploads/2022/02/12/background-chat-luong-cho-powerpoint_100426266.jpg',
                            }}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                width: 150,
                                height: 150,
                                borderRadius: 20,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.3,
                                elevation: 13,
                            }}
                        >
                            <Pressable
                                style={{
                                    zIndex: 1,
                                    width: '100%',
                                    height: '100%',
                                }}
                                onPress={() => {
                                    this.props.setGameMode('Multiplay')
                                    this.navigate('Multiplay')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Multiplay
                                </Text>
                            </Pressable>
                        </ImageBackground>
                    </View>
                    <View
                        style={{
                            width:'100%',
                            height: '40%',
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <ImageBackground
                            source={{
                                uri: 'https://phunugioi.com/wp-content/uploads/2021/11/Background-de-thuong-hoat-hinh.jpg',
                            }}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                width: 300,
                                marginLeft:10,
                                height: 150,
                                borderRadius: 20,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.3,
                                marginRight: 10,
                                elevation: 13,
                            }}
                        >
                            <Pressable
                                style={{
                                    zIndex: 1,
                                    width: '100%',
                                    height: '100%',
                                }}
                                onPress={() => {
                                    this.props.setGameMode('VsMachine')
                                    this.navigate('VsMachine')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Vs Machine
                                </Text>
                            </Pressable>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.userState)
    return { userState: state.userState, gameState: state.gameState }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ fetchUser, setGameMode }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
