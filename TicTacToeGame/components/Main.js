import React, { Component } from 'react'
import {
    View,
    Text,
    Pressable,
    Image,
    ImageBackground,
    Modal,
    Switch,
    StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    fetchUser,
    setGameMode,
    connectionStatusChange,
} from '../redux/actions/index'
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
import NetInfo from '@react-native-community/netinfo'
var Sound = require('react-native-sound')
import Verify from './auth/Verify'
class Main extends Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    componentDidMount() {
        this.NetInfoSubcribtion = NetInfo.addEventListener((state) => {
            this.props.connectionStatusChange(state.isConnected)
        })
        this.props.fetchUser()
        console.log('Verify: ' + auth().currentUser.emailVerified)
    }
    componentWillUnmount() {
        this.NetInfoSubscribtion && this.NetInfoSubscribtion()
        console.log(NetInfo.isConnected)
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
        console.log(auth().currentUser.emailVerified)
        if (!auth().currentUser.emailVerified) {
            console.log(auth().currentUser.emailVerified)
            return <Verify user={auth().currentUser} />
        }
        if (this.props.userState.currentUser === null) {
            return <View></View>
        } else {
            userName = this.props.userState.currentUser.name
            console.log(this.props.userState.currentUser)
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    showHideTransition={true}
                    hidden={true}
                />
                {/* Modal Settings */}
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
                                <Image
                                    source={require('../images/icons/cancel.png')}
                                    style={{
                                        width: 30,
                                        height: 30,
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
                {/* Modal Error connection */}
                <Modal
                    visible={!this.props.gameState.connection_status}
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
                                onPress={() => {
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
                            borderRadius: 50,
                            backgroundColor: 'white',
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
                        {/* <Icon name="settings-outline" size={30} style={{
                            color: 'black'
                        }} /> */}
                        <Image
                            source={require('../images/icons/setting.png')}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </Pressable>
                    <Image
                        source={{
                            uri: 'https://cdn-icons.flaticon.com/png/512/4681/premium/4681761.png?token=exp=1650444251~hmac=13879ae15bf373b7b7dc95708c1bdef3',
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
                                   Play With Machine
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
                                    Play Local Multiplayer
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
                                   Play With Friend
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
                                    this.props.setGameMode('Online')
                                    this.navigate('Online')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Play Online
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
                                uri: 'https://img6.thuthuatphanmem.vn/uploads/2022/02/12/background-chat-luong-cho-powerpoint_100426266.jpg',
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
                                    this.navigate('BoardSettings')
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Board Settings
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
    return { userState: state.userState, gameState: state.gameState }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        { fetchUser, setGameMode, connectionStatusChange },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Main)
