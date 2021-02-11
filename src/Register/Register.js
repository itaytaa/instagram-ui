import React from 'react'
import './Register.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerSchema } from './register.schema'
import { useHistory } from 'react-router-dom'
import Animation from '../Animation/Animation';
function Register() {

    const history = useHistory()

    function submit(values) {
        console.log(values)
        fetch('http://localhost:4000/user', {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.status === 201) {
                history.push('./login')
                return
            }
            console.log('failure')
        })

    }
    return (
        <div className="Register container" >
            <h2 className=" text-center">Sign Up!</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', confirm_password:'', agreeToTerms: false }}
                validationSchema={registerSchema}
                onSubmit={submit}>
                <Form >
                    <div className="form-group mb-3 "  >
                        <label htmlFor="username">Username</label>
                        <Field id="username" name="username" className="form-control" type="text" />
                        <ErrorMessage className="error" name="username" component="div" />
                    </div>
                    <div className="form-group mb-3 " >
                        <label htmlFor="email">Email:</label>
                        <Field id="email" name="email" className="form-control" type="email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        <ErrorMessage className="error" name="email" component="div" />
                    </div>
                    <div className="form-group mb-3 " >
                        <label htmlFor="password">Password:</label>
                        <Field id="password" name="password" className="form-control" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div className="form-group mb-3 " >
                        <label htmlFor="confirm_password">Confirm Password:</label>
                        <Field id="confirm_password" name="confirm_password" className="form-control" type="password" />
                        <ErrorMessage name="confirm_password" component="div" />
                    </div>
                    <div className="form-group mb-3 form-check" >
                        <Field className="form-check-input" id="agreeToTerms" name="agreeToTerms" type="checkbox" />
                        <label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
                        <ErrorMessage className="error" name="agree To Terms" component="div" />
                    </div>
                    <div className="form-group " >
                        <button type="submit" className="btn btn-primary btn-lg">Sign-Up</button>
                    </div>
                </Form>
            </Formik>
            <Animation />

        </div>
    )
}

export default Register
