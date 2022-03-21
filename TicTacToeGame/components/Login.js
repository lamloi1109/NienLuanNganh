import React from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native'
import SignupSchema from './Validation'
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }

        this.handleOnSignIn = this.handleOnSignIn.bind(this)
    }
    handleOnSignIn() {
        const { email, password } = this.state
        console.log('signin')
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
                console.error(error)
            })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.heading}>SignIn Screen</Text>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignupSchema}
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
                                <TextInput
                                    placeholder="Email"
                                    // value={this.state.email}
                                    // onChangeText={(email) =>
                                    //     this.setState({ email })
                                    // }
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={styles.input}
                                />
                                {errors.email && touched.email ? (
                                    <Text>{errors.email}</Text>
                                ) : null}
                                <TextInput
                                    placeholder="Password"
                                    // value={this.state.password}
                                    // onChangeText={(password) =>
                                    //     this.setState({ password })
                                    // }
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    style={styles.input}
                                    secureTextEntry
                                />
                                {errors.password && touched.password ? (
                                    <Text>{errors.password}</Text>
                                ) : null}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>
                                        Login
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
    },
    inputContainer: {
        width: '80%',
        marginTop: 30,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    button: {
        width: '100%',
        backgroundColor: '#006D6A',
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
        color: '#006D6A',
        fontWeight: '700',
        fontSize: 16,
    },
    heading: {
        fontSize: 40,
    },
})
