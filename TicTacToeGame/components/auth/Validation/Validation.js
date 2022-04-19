import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/\w*[a-z]\w*/, 'Name must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Name must have a capital letter')
        .matches(/\d/, 'Name must have a number')
        .min(8, ({ min }) => `Name must be at least ${min} characters`)
        .required('Name is required'),
    password: Yup.string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .matches(
            /[!@#$%^&*()\-_"=+{}; :,<.>]/,
            'Password must have a special character'
        )
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
})

export const SigninSchema = Yup.object().shape({
    password: Yup.string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .matches(
            /[!@#$%^&*()\-_"=+{}; :,<.>]/,
            'Password must have a special character'
        )
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
})
export default SignupSchema
