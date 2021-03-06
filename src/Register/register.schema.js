import * as yup from 'yup';
import environment from '../environments/index'


export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, "Too Short!")
        .max(60, "Too Long")
        .required()
        .test('checkUsernameUnique', 'This Username is already registered.', (value) => {
            return new Promise((resolve, reject) => {
                fetch(`${environment.apiUrl}/is-username-unique/${value}`)
                    .then(res => res.json())
                    .then((res) => {
                        console.log(res)
                        // exists
                        resolve(res)
                    }).catch((res) => {
                        // note exists
                        resolve(res)
                    })
            })
        }),
    email: yup.string()
        .max(100)
        .email()
        .required()
        .test('checkEmailUnique', 'This email is already registered.', (value) => {
            return new Promise((resolve, reject) => {
                fetch(`${environment.apiUrl}/user/is-email-unique/${value}`)
                    .then(res => res.json())
                    .then((res) => {
                        // exists
                        resolve(res)
                    }).catch((res) => {
                        // note exists
                        resolve(res)
                    })
            })
        }),
    password: yup.string()
        .min(6, "Too Short!")
        .max(26, "Too Long!")
        .required(),
    confirm_password: yup.string()
        .trim()
        .oneOf([yup.ref("password")], "Password's not match")
        .required(),
    agreeToTerms: yup.mixed().oneOf([true], "You nust agree to terms")
});