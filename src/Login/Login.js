

import Animation from '../Animation/Animation';
import { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import { loginSchema } from './login.schema';

function Login() {
	const history = useHistory();
	const [showError, setShowError] = useState(false);

	function submit(values) {
		setShowError(false);
		fetch('http://localhost:4000/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		}).then(res => {
			if (res.status === 200) {
				res.json()
					.then(json => {
						Cookies.set('instagram-user', json.token, { expires: 30 });
						history.push('/');
					});
				return;
			}
			setShowError(true);
		});
	}


    return (
        <div className="container">
            <span className="moments">Momoents That Count</span>
            <div className="Login container">


                <h1>Login</h1>
                {showError && <div className="alert alert-danger">
                    incorrect username or password
            </div>}
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={submit}>
                    <Form>
                        <div className="form-group mb-3 ">
                            <label htmlFor="username">Username:</label>
                            <Field id="username" name="username" className="form-control" type="text" />
                        </div>
                        <div className="form-group mb-3  mp-3 mx-auto">
                            <label htmlFor="password">Password:</label>
                            <Field id="password" name="password" className="form-control" type="password" />
                        </div>
                        <div className="form-group mb-3 mx-auto" >
                            <button type="submit" className="btn btn-primary btn-lg">Login</button>
                        </div>


                    </Form>
                </Formik>
                <Animation />
            </div>
        </div>
    )
}

export default Login
