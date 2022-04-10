import React from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native'
import {SignupSchema} from '../Validation'
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'
import firestore from '@react-native-firebase/firestore';
export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
        }

        this.handleOnSignUp = this.handleOnSignUp.bind(this)
    }
    handleOnSignUp() {
        const {name, email, password } = this.state
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firestore()
                    .collection("users")
                    .doc(auth().currentUser.uid)
                    .set({
                        name,
                        email
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
                }
                console.error(error)
            })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.heading}>Register Screen</Text>
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
                                <TextInput
                                    placeholder="Name"
                                    // value={this.state.name}
                                    // onChangeText={(name) =>
                                    //     this.setState({ name })
                                    // }
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.input}
                                />
                                {errors.name && touched.name ? (
                                    <Text>{errors.name}</Text>
                                ) : null}
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
                                <TextInput
                                    placeholder="Confirm Password"
                                    // value={this.state.password}
                                    // onChangeText={(password) =>
                                    //     this.setState({ password })
                                    // }
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
                                    <Text>{errors.confirmPassword}</Text>
                                ) : null}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    // onPress={this.handleOnSignUp}
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>
                                        Signup
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
