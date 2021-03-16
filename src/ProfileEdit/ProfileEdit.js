import React, { useState, useContext, useRef } from 'react'
import './ProfileEdit.scss'
import { updateSchema } from './updateSchema'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserContext } from '../user-context'
import { useHistory, Link } from 'react-router-dom'
import Avatar from '../Common/Avatar/Avatar'
import { UserService } from '../services/user.service';
import ImageCropper from '../PostCreate/Cropper/ImageCropper'







function ProfileEdit() {
    const mycanvas = useRef()
    const hidtory = useHistory()
    const { user, setUser } = useContext(UserContext)
    const [success, setSuccess] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState('')

    function submit() {

    }
    function previewFile(file) {
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
    }
   async function  makeCanvas() {

     const pic =   new Image();
        pic.src = avatarPreview
        await   mycanvas.drawImage(pic, 0, 0)

        return mycanvas
    }

    return (
        <div className="ProfileEdit ">
            <h1> Edit Profile</h1>
            <div className="Form-Container">
                <Avatar size="lg" />

                <Formik
                    initialValues={{ username: '', email: '', bio: '' }}
                    validationSchema={updateSchema}
                    onSubmit={submit}>
                    {({ setFieldValue, isSubmitting }) => (
                        <Form >
                            <div className="d-flex flex-column align-items-center">

                                {avatarPreview && <canvas ref={mycanvas} ></canvas>}

                                    < input id="input" hidden="hidden" accept="image/*" type="file" onChange={(e) => {
                                    previewFile(e.target.files[0]);
                                    setFieldValue('image', e.target.files[0]);
                                }} />

                                <div className=" button-label form-group">
                                    <label htmlFor="input">Upload Photo</label>
                                </div>

                            </div>

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
                                <label htmlFor="bio">Bio</label>
                                <Field id="bio" name="bio" className="form-control" type="text" placeholder={`Tell us a little about ${user.username}`} />
                                <ErrorMessage className="error" name="bio" component="div" />
                            </div>
                            <div className="form-group" >
                                {success ? <div className="alert alert-success" role="alert">Success! please wait...</div> :
                                    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting} > {isSubmitting ? 'Updating' : 'Update Profile'}</button>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>





            </div>


        </div>
    )
}

export default ProfileEdit
