import React, { useState, useRef, useEffect } from 'react'
import './PostCreate.scss';
import { PostCreateSchema } from './post-create.schema';
import { Formik, Field, Form } from 'formik';
import environment from '../environments/index';
import { useHistory } from 'react-router-dom'
import { UserService } from '../services/user.service';
import ImageCropper from './Cropper/ImageCropper'
let photo;


function PostCreate() {

    const history = useHistory()
    const [chosenFile, setChosenFile] = useState('')
    const realButton = useRef(null);
    const [editedImage, setEdited] = useState('')
    const [changed, setChanged] = useState(false);
const[style, setStyle]  = useState({})


    async function submit(values) {

        const image = await fetch(editedImage)

        const newImage = await image.blob()
        console.log(newImage)
        const data = new FormData()
        data.append('image', newImage)
        data.append('description', values.description)

        try {
            await fetch(environment.apiUrl + '/post', {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: UserService.getToken()
                }
            })
            history.push('/')
        } catch (err) {
            console.log(err)
        }
        console.log(data)

    }

    useEffect(() => {
        setChanged(true)
    }, [chosenFile])


console.log(chosenFile)

    return (
        <div className="PostCreate">
            <h2 className="title mt-4">Create Post</h2>
            <Formik
                initialValues={{ image: '', description: '' }}
                valitaionSchema={PostCreateSchema}
                onSubmit={submit}>
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="form d-flex flex-column " noValidate>
                        <input type="file" id="input" name="image" hidden="hidden" ref={realButton} accept="image/*" onChange={(e) => {
                            if (e.target.files.length === 0) return
                            setChanged(false);
                            setChosenFile(URL.createObjectURL(e.target.files[0]))
                        }}
                        />
                        <div className=" button-label form-group">
                            <label htmlFor="input" >CHOOSE A FILE</label>
                        </div>
                        { chosenFile && changed && <ImageCropper src={chosenFile} edited={(image, style) => { 
                           
                            setEdited(image) 
                            }}    />}
                        <div className="form-group d-flex flex-column w-100">

                            <div className="form-group my-3 d-flex align-items-end justify-content-between">
                                <div className="w-100">{chosenFile && <span>Add Caption:</span>}
                                    {chosenFile && <Field as="textarea" name="description" className="form-control w-100"></Field>}
                                </div>
                                <div className="">
                                    {chosenFile && <button type="submit" className="m-3 submit-btn align-self-start" disabled={!chosenFile || isSubmitting}>{isSubmitting ? 'Posting' : 'Share'} </button>}
                                </div>

                            </div>
                        </div>

                        <div className="form-group">

                        </div>
                    </Form>
                )}
            </Formik>


        </div>
    )
}

export default PostCreate
