import React from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native'
import { SigninSchema } from './Validation/Validation'
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.navigate = this.navigate.bind(this)
        this.handleOnSignIn = this.handleOnSignIn.bind(this)
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    handleOnSignIn() {
        console.log('signin')
        const { email, password } = this.state
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User sign in successful!')
                toast.show('User sign in successful!', {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in',
                })
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!')
                    toast.show('That email address is invalid!', {
                        type: 'warning ',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 30,
                        animationType: 'slide-in',
                    })
                }
                if (error.code === 'auth/wrong-password') {
                    console.log(
                        'The password is invalid or the user does not have a password.'
                    )
                    toast.show(
                        'The password is invalid or the user does not have a password.',
                        {
                            type: 'warning ',
                            placement: 'bottom',
                            duration: 4000,
                            offset: 30,
                            animationType: 'slide-in',
                        }
                    )
                }
                if (error.code === 'auth/user-not-found') {
                    console.log('User doesnot exist.')
                    toast.show('User doesnot exist.', {
                        type: 'warning ',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 30,
                        animationType: 'slide-in',
                    })
                }
                // console.error(error)
            })
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Log In</Text>
                </View>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SigninSchema}
                    onSubmit={(values) => {
                        this.setState({
                            email: values.email,
                            password: values.password,
                        })
                        this.handleOnSignIn()
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.text}>Email</Text>
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#C7C7C7"
                                    value={this.state.email}
                                    onChangeText={(email) =>
                                        this.setState({ email })
                                    }
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={styles.input}
                                />
                                {errors.email && touched.email ? (
                                    <Text style={styles.textMessage}>
                                        {errors.email}
                                    </Text>
                                ) : null}
                                <Text style={styles.text}>Password</Text>

                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#C7C7C7"
                                    value={this.state.password}
                                    onChangeText={(password) =>
                                        this.setState({ password })
                                    }
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    style={styles.input}
                                    secureTextEntry
                                />
                                {errors.password && touched.password ? (
                                    <Text style={styles.textMessage}>
                                        {errors.password}
                                    </Text>
                                ) : null}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signUpContainer}>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            fontSize: 20,
                                            textAlign: 'center',
                                        },
                                    ]}
                                >
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity
                                      onPress={() => {
                                        this.navigate('SignUp')
                                    }}
                                >
                                    <Text style={styles.signUpText}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '80%',
        marginTop: 30,
    },
    textContainer: {
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 5,
        color: '#6C6C6C',
        borderColor: '#C7C7C7',
        borderWidth: 2,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    signUpContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
        borderTopWidth: 2,
        borderTopColor: '#ECECEC'
    },
    signUpText: {
        color: '#2A76BF',
        margin: 10,
        fontSize: 20
    },
    button: {
        width: '100%',
        backgroundColor: '#0085FF',
        padding: 10,
        textAlign: 'center',
        margin: 5,
        borderRadius: 10,
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#006D6A',
        borderWidth: 2,
        marginTop: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: 'black',
    },
    heading: {
        fontSize: 40,
        color: '#121212',
        textAlign: 'left',
    },
    text: {
        color: '#5E5E5E',
        marginLeft: 10,
        marginTop: 5,
    },
    textMessage: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5,
    },
})
