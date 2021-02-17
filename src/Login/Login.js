

import Animation from '../Animation/Animation';
import { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import './Login.scss';
import { loginSchema } from './login.schema';
import { AiOutlineUser } from 'react-icons/ai';
import { BsLock } from "react-icons/bs";
import { UserService } from '../services/user.service';




function Login() {
    const history = useHistory();
    const [success, setSuccess] = useState(false)
    const [showError, setShowError] = useState(false);

    async function submit(values) {
        setShowError(false);
        const login = await UserService.login(values)

        if (login.status === 200) {
            const json = await login.json()
           await Cookies.set('instagram-user', json.token, { expires: 30 });
           console.log(Cookies)
            setSuccess(true);
            setTimeout(() => {
                history.push('/');
            }, 2000);
          
            return;
        }
        setShowError(true);
    }


    return (
        <div className="container">
            <span className="moments">Moments That Count</span>
            <div className="Login container">


                <h2 className="mb-4">Login</h2>
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
                                <button type="submit" className="btn btn-primary">Login</button>}
                        </div>
                        <hr className="mt-4" />
                        <p>don't have an account? <Link to='/Register'>Register</Link></p>

                    </Form>
                </Formik>
                <Animation />
            </div>
        </div>
    )
}

export default Login
