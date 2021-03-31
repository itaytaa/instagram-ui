

import Animation from '../Animation/Animation';
import { useState, useContext } from 'react';
import { Form, Formik, Field } from 'formik';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import './Login.scss';
import { loginSchema } from './login.schema';
import { AiOutlineUser } from 'react-icons/ai';
import { BsLock } from "react-icons/bs";
import { UserService } from '../services/user.service';
import { UserContext } from '../user-context';




function Login() {

    const history = useHistory();
    const { setUser } = useContext(UserContext)
    const [success, setSuccess] = useState(false)
    const [showError, setShowError] = useState(false);

    async function submit(values) {
        setShowError(false);
        const login = await UserService.login(values)
        if (login.status !== 200) {
            setShowError(true);
            return;
        }
        const json = await login.json()
        Cookies.set('instagram-user', json.token, { expires: 30 });
        setSuccess(true);
        const user = await UserService.me();
        setTimeout(() => {
            setUser(user)
            history.push('/');
        }, 2000)
    }


    return (
        <div className="Login container">
          
            <div className="d-flex justify-content-center">
                <span className="moments ">Instagram</span>
            </div>
            <div className="Login-form d-flex flex-nowrap">
                <h1 className="mb-4 align-self-center">Login</h1>
                {showError && <div className="alert alert-danger">
                    incorrect username or password
            </div>}
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={submit}>
                    <Form>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text" id="basic-addon1"><AiOutlineUser /></span>
                            <Field id="username" name="username" className="form-control" type="text" placeholder="Username" />
                        </div>
                        <div className="input-group mb-3  mp-3 mx-auto">
                            <span className="input-group-text" id="basic-addon1"><BsLock /></span>
                            <Field id="password" name="password" className="form-control" type="password" placeholder="Password" />
                        </div>
                        <div className="form-group ">
                            {success ? <div className="alert alert-success" role="alert">Success! please wait ...</div> :
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>}
                        </div>
                        <hr className="mt-4" />
                        <p className="d-flex flex-nowrap">don't have an account? &nbsp;<Link to='/register'> Register</Link></p>

                    </Form>
                </Formik>

            </div>
            <Animation />
        </div>
    )
}

export default Login
