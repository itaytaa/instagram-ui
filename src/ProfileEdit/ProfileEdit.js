import React, { useState, useContext, useEffect } from 'react'
import './ProfileEdit.scss'
import { UpdateSchema } from './updateSchema'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserContext } from '../user-context'
import { useHistory } from 'react-router-dom'
import Avatar from '../Common/Avatar/Avatar'
import { UserService } from '../services/user.service';
import ImageCropper from '../PostCreate/Cropper/ImageCropper'







function ProfileEdit() {

    const history = useHistory()
    const [chosenFile, setChosenFile] = useState('')
    const { user, setUser } = useContext(UserContext)

    const [editedImage, setEdited] = useState('')
    const [changed, setChanged] = useState(false);

    async function submit(values) {
        if (values.username === '') {
            values.username = user.username
        }
        if (values.email === '') {
            values.email = user.email
        }
        if (values.bio === '') {
            values.bio = user.bio
        }
        if (editedImage) {
            const image = await fetch(editedImage)
            const newImage = await image.blob()
            values.image = newImage;
        }
        try {
            const newUser = await UserService.edit(values, user._id)
            setUser(newUser)
            history.push(`/Profile/${user.username}`)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        setChanged(true)

    }, [chosenFile])

    return (
        <div className="ProfileEdit d-flex flex-column ">
            <h1 className="mx-auto my-3 "> Edit Profile</h1>
            <div className="form-Container m-4 d-flex flex-column ">
                {chosenFile && changed ?
                    <ImageCropper src={chosenFile} edited={(image) => { setEdited(image) }} isAvatar={true} /> :
                    <span className="postEdit-avatar my-3"> <Avatar size="lg" image={user.avatar} /></span>}

                <Formik
                    initialValues={{ username: ``, email: '', bio: '' }}
                    validationSchema={UpdateSchema}
                    onSubmit={submit}>
                    {({ setFieldValue, isSubmitting, handleChange }) => (
                        <Form >
                            <div className="d-flex flex-column align-items-center">

                                < input id="input" hidden="hidden" accept="image/*" type="file" onChange={(e) => {
                                    if (e.target.files.length === 0) return
                                    setChanged(false);
                                    setChosenFile(URL.createObjectURL(e.target.files[0]))
                                }} />
                                <div className=" button-label form-group">
                                    <label htmlFor="input">Upload Photo</label>
                                </div>

                            </div>

                            <div className="form-group mb-3 "  >
                                <label htmlFor="username">Username</label>
                                <input onChange={(e) => {
                                    // validate
                                    if(e.target.value !== user.username) {
                                        handleChange(e);
                                    }
                                }}id="username" name="username" className="form-control" type="text" placeholder={user.username} />
                                <ErrorMessage className="error" name="username" component="div" />
                            </div>
                            <div className="form-group mb-3 " >
                                <label htmlFor="email">Email</label>
                                <input onChange={(e) => {
                                    // validate
                                    if(e.target.value !== user.email) {
                                        handleChange(e);
                                    }
                                }} id="email" name="email" className="form-control" type="email" placeholder={user.email} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                <ErrorMessage className="error" name="email" component="div" />
                            </div>
                            <div className="form-group mb-3 " >
                                <label htmlFor="bio">Bio</label>
                                <Field id="bio" name="bio" className="form-control" type="text" placeholder={user.bio} />
                                <ErrorMessage className="error" name="bio" component="div" />
                            </div>

                            <div className="form-group" >
                                {/* {success ? <div className="alert alert-success" role="alert">Success! please wait...</div> : */}
                                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting} > {isSubmitting ? 'Updating' : 'Update Profile'}</button>
                                {/* } */}
                            </div>
                        </Form>
                    )}
                </Formik>





            </div>


        </div>
    )
}

export default ProfileEdit
