import { React, useState } from 'react'
import './Register.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registerSchema } from './register.schema'
import { useHistory, Link } from 'react-router-dom'
import Animation from '../Animation/Animation';
import { UserService } from '../services/user.service';
function Register() {

    const history = useHistory()
    const [success, setSuccess] = useState(false)


   async function submit(values) {
        const register = await UserService.register(values)
        if (register.status === 201) {
            setSuccess(true)  //if true - display success message 
            setTimeout(() => {
                history.push('./login')
            }, 2500);
            return
        }
        console.log('failure')
    }


    return (
        <div className="Register container" >
            <h2 className=" text-center">Sign Up!</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', confirm_password: '', agreeToTerms: false }}
                validationSchema={registerSchema}
                onSubmit={submit}>
                <Form >
                    <div className="form-group mb-3 "  >
                        <label htmlFor="username">Username</label>
                        <Field id="username" name="username" className="form-control" type="text" />
                        <ErrorMessage className="error" name="username" component="div" />
                    </div>
                    <div className="form-group mb-3 " >
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" className="form-control" type="email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        <ErrorMessage className="error" name="email" component="div" />
                    </div>
                    <div className="form-group mb-3 " >
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" className="form-control" type="password" />
                        <ErrorMessage className="error" name="password" component="div" />
                    </div>
                    <div className="form-group mb-3 " >
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <Field id="confirm_password" name="confirm_password" className="form-control" type="password" />
                        <ErrorMessage className="error" name="confirm_password" component="div" />
                    </div>
                    <div className="form-group mb-3 form-check" >
                        <Field className="form-check-input" id="agreeToTerms" name="agreeToTerms" type="checkbox" />
                        <label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
                        <ErrorMessage className="error" name="agreeToTerms" component="div" />
                    </div>
                    <div className="form-group " >
                        {success ? <div className="alert alert-success" role="alert">Success! please wait...</div> :
                            <button type="submit" className="btn btn-primary  btn-block" >Sign-Up</button>
                        }
                    </div>
                    <hr className="mt-4" />
                    <p>already have an account? <Link to='./Login'>Login</Link></p>
                </Form>
            </Formik>
            <Animation />

        </div>
    )
}

export default Register
