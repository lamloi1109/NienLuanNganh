import React from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native'
import { SignupSchema } from './Validation/Validation'
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'
import firestore from '@react-native-firebase/firestore'
export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
        }
        this.navigate = this.navigate.bind(this)

        this.handleOnSignUp = this.handleOnSignUp.bind(this)
    }
    navigate(txt) {
        this.props.navigation.navigate(txt)
    }
    handleOnSignUp() {
        const { name, email, password } = this.state
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                auth()
                    .currentUser.sendEmailVerification()
                    .then(() => {
                        firestore()
                            .collection('users')
                            .doc(auth().currentUser.uid)
                            .set({
                                name,
                                email,
                            })
                        console.log('User account created & signed in!')
                        toast.show('Task finished successfully', {
                            type: 'success',
                            placement: 'bottom',
                            duration: 4000,
                            offset: 30,
                            animationType: 'slide-in',
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        toast.show(error, {
                            type: 'success',
                            placement: 'bottom',
                            duration: 4000,
                            offset: 30,
                            animationType: 'slide-in',
                        })
                    })
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.show('That email address is already in use!', {
                        type: 'warning ',
                        placement: 'bottom',
                        duration: 4000,
                        offset: 30,
                        animationType: 'slide-in',
                    })
                }
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
                // console.error(error)
            })
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Sign Up</Text>
                </View>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        this.setState({
                            email: values.email,
                            password: values.password,
                            name: values.name,
                        })
                        this.handleOnSignUp()
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
                                <Text style={styles.text}>Name</Text>
                                <TextInput
                                    placeholder="Name"
                                    placeholderTextColor="#C7C7C7"
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.input}
                                />
                                {errors.name && touched.name ? (
                                    <Text style={styles.textMessage}>
                                        {errors.name}
                                    </Text>
                                ) : null}
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
                                <Text style={styles.text}>
                                    Confirm Password
                                </Text>

                                <TextInput
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#C7C7C7"
                                    value={this.state.password}
                                    onChangeText={(password) =>
                                        this.setState({ password })
                                    }
                                    onChangeText={handleChange(
                                        'confirmPassword'
                                    )}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    style={styles.input}
                                    secureTextEntry
                                />
                                {errors.confirmPassword &&
                                touched.confirmPassword ? (
                                    <Text style={styles.textMessage}>
                                        {errors.confirmPassword}
                                    </Text>
                                ) : null}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signInContainer}>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            fontSize: 20,
                                            textAlign: 'center',
                                        },
                                    ]}
                                >
                                    Already have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.navigate('Login')
                                    }}
                                >
                                    <Text style={styles.signInText}>
                                        Sign In
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
    textContainer: {
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    signInContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
        borderTopWidth: 2,
        borderTopColor: '#ECECEC',
    },
    signInText: {
        color: '#2A76BF',
        margin: 10,
        fontSize: 20,
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
        color: '#006D6A',
        fontWeight: '700',
        fontSize: 16,
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
