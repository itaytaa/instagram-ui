import React from 'react'
import './Register.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {registerSchema} from './register.schema'
function Register() {

    return (
        <div>
            <h2>Register</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', agreeToTerms: false }}
                validationSchema={registerSchema}>
                <Form>
                    <div className="form-group mb-3" >
                        <label htmlFor="username">Username</label>
                        <Field id="username" name="username" className="form-control" type="text" />
                        <ErrorMessage name="username" component="div"/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email:</label>
                        <Field id="email" name="email" className="form-control" type="email" />
                        <ErrorMessage name="email" component="div"/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password:</label>
                        <Field id="password" name="password" className="form-control" type="password" />
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <div className="form-group mb-3 form-check">
                        <label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
                        <Field id="agreeToTerms" name="agreeToTerms"  type="checkbox" />
                        <ErrorMessage name="agreeToTerms" component="div"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Register</button>
                    </div>
                </Form>
            </Formik>



        </div>
    )
}

export default Register
