import * as Yup from 'yup';
export const PostCreateSchema = Yup.object().shape({
    image: Yup.mixed()
    .required('image is required'),
    description :Yup.string()
    .max(2000,'Caption is too long ')
})