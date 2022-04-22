import React from 'react'
import { View, Text, TouchableOpacity, Linking, Image, NativeModules } from 'react-native'
import auth from '@react-native-firebase/auth'
export default function Verify(user) {
    const email = user.user.email
    const VerifyStatus = user.user.emailVerified
    console.log(VerifyStatus)
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 100,
                }}
                source={{
                    uri: 'https://cdn-icons.flaticon.com/png/512/998/premium/998106.png?token=exp=1650448282~hmac=6bb81efca0d24d97fdd67db281c4f983',
                }}
            />
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginBottom: 20,
                }}
            >
                Check Your Email
            </Text>
            <Text
                style={{
                    width: '70%',
                    fontSize: 16,
                    marginBottom: 20,
                    textAlign: 'center',
                }}
            >
                To confirm your email address, tap the button in the email we
                sent to {email}
            </Text>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginBottom: 20,
                }}
            >
                Verify Status: {VerifyStatus+""}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL('http://m.gmail.com/')
                }}
                style={{
                    backgroundColor: 'white',
                    padding: 20,
                    width: '50%',
                    borderRadius: 10,
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        textAlign: 'center',
                    }}
                >
                    Open Email App
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    auth()
                    .signOut()
                    .then(() =>
                        console.log('User signed out!')
                    )
                    NativeModules.DevSettings.reload();
                }}
                style={{
                    marginTop:20,
                    backgroundColor: 'black',
                    padding: 20,
                    width: '50%',
                    borderRadius: 10,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    Sign Out
                </Text>
            </TouchableOpacity>
        </View>
    )
}
