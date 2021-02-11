import * as yup from 'yup';



export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, "Too Short!")
        .max(60, "Too Long")
        .required()
        .test('checkUsernameUnique', 'This Username is already registered.', (value) => {
            return new Promise((resolve, reject) => {
                fetch(`http://localhost:4000/user/is-username-unique/${value}`)
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
    email: yup.string()
        .max(100)
        .email()
        .required()
        .test('checkEmailUnique', 'This email is already registered.', (value) => {
            return new Promise((resolve, reject) => {
                fetch(`http://localhost:4000/user/is-email-unique/${value}`)
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
        .oneOf([yup.ref("password")], "Password's not match")
        .required(),
    agreeToTerms: yup.mixed().oneOf([true])
});