// import * as Yup from 'yup';
// export const PostCreateSchema = Yup.object().shape({
//     image: Yup.mixed()
//     .required('image is required'),
//     description :Yup.string()
//     .max(2000,'Caption is too long ')
// })

import * as yup from 'yup';

export const UpdateSchema = yup.object().shape({
    username: yup.string()
        .min(3, "Too Short!")
        .max(60, "Too Long")
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
    })
    , bio: yup.string()
    , email: yup.string()
        .max(100)
        .email()
      
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
        })

});
    
    
    
    
    
    
    
  