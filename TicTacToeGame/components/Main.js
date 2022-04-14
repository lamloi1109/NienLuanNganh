import React, { Component } from 'react'
import {
    View,
    Text,
    Pressable,
    Image,
    ImageBackground,
    Modal,
    Switch,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, setGameMode } from '../redux/actions/index'
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
var Sound = require('react-native-sound')

class Main extends Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    componentDidMount() {
        // console.log(this.props)
        this.props.fetchUser()
    }
    state = {
        modalVisible: false,
        isEnabled: true,
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }

    render() {
        const { modalVisible, isEnabled } = this.state
        Sound.setCategory('Playback')
        var ding = new Sound('touch.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error)
                return
            }
            // when loaded successfully
            console.log(
                'duration in seconds: ' +
                    ding.getDuration() +
                    'number of channels: ' +
                    ding.getNumberOfChannels()
            )
        })
        const playPause = () => {
            if (isEnabled) {
                ding.setVolume(1)
                console.log('volume: ' + ding.getVolume())
            } else {
                ding.setVolume(0)
                console.log('volume: ' + ding.getVolume())
            }
            ding.play((success) => {
                if (success) {
                    console.log('successfully finished playing')
                } else {
                    console.log('playback failed due to audio decoding errors')
                }
            })
        }
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.')
                        this.setModalVisible(!modalVisible)
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 22,
                        }}
                    >
                        <View
                            style={{
                                margin: 20,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 35,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                position: 'relative',
                            }}
                        >
                            <Pressable
                                style={{
                                    borderRadius: 10,
                                    padding: 5,
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                                onPress={() =>
                                    this.setModalVisible(!modalVisible)
                                }
                            >
                                <Icon
                                    name="close-circle-outline"
                                    size={30}
                                    style={{
                                        color: '#2196F3',
                                    }}
                                />
                            </Pressable>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                }}
                            >
                                Settings
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10,
                                    backgroundColor: '#D7D7E7',
                                    margin: 10,
                                }}
                            >
                                <Text>Sound</Text>
                                <Switch
                                    trackColor={{
                                        false: '#767577',
                                        true: '#81b0ff',
                                    }}
                                    thumbColor={
                                        isEnabled ? '#f5dd4b' : '#f4f3f4'
                                    }
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        this.setState({
                                            isEnabled: !isEnabled,
                                        })
                                        console.log(
                                            'volume 1: ' + ding.getVolume()
                                        )
                                        console.log(
                                            'volume 2: ' + ding.getVolume()
                                        )
                                    }}
                                    value={isEnabled}
                                />
                            </View>
                            <Pressable
                                style={{
                                    borderRadius: 20,
                                    padding: 10,
                                    elevation: 2,
                                    backgroundColor: '#2196F3',
                                }}
                                onPress={() => {
                                    auth()
                                        .signOut()
                                        .then(() =>
                                            console.log('User signed out!')
                                        )
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    Sign Out!
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={!this.props.connection_status}
                    transparent={true}
                    animationInTiming={600} 
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            paddingHorizontal: 16,
                            paddingBottom: 40,
                        }}
                    >
                        <View
                             style={{
                                backgroundColor: '#fff',
                                paddingHorizontal: 16,
                                paddingTop: 20,
                                paddingBottom: 40,
                                alignItems: 'center',
                            }}  
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: '600',
                                }}
                            >
                                Connection Error
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#555',
                                    marginTop: 14,
                                    textAlign: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                Oops! Looks like your device is not connected to
                                the Internet.
                            </Text>
                            <Pressable
                                style={{
                                    backgroundColor: '#000',
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                                onPress={() =>{
                                    this.props.fetchUser()
                                }} 
                                disabled={this.props.loaded}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                    }}
                                >
                                    Try Again
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
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
                        onPress={() => this.setModalVisible(true)}
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
                        marginBottom: 50,
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
                                    playPause()
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
                                    playPause()
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
                                    playPause()
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
                                    playPause()
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
                            width: '100%',
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
                                marginLeft: 10,
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
                                    width: '100%',
                                    height: '100%',
                                }}
                                onPress={() => {
                                    playPause()
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
