import React, { useState, useRef } from 'react'
import './PostCreate.scss';
import { PostCreateSchema } from './post-create.schema';
import { Formik, Field, Form } from 'formik';
import environment from '../environments/index';
import { useHistory } from 'react-router-dom'
import { UserService } from '../services/user.service';



function PostCreate() {
    const history = useHistory()
    const [chosenFile, setChosenFile] = useState('')
    const realButton = useRef(null);


    function click() {
        realButton.current.click()
    }

    async function submit(values) {
        const data = new FormData()
        data.append('image', values.image)
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


    }

    return (
        <div className="PostCreate vh-100 ">
            <h2 className="title mt-4">Create Post</h2>
            <Formik
                initialValues={{ image: '', description: '' }}
                valitaionSchema={PostCreateSchema}
                onSubmit={submit}>
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="form d-flex flex-column " noValidate>
                        <div className="form-group">
                            <button type="button" onClick={click} id="custom-button" className="btn btn-lg btn-outline-secondary btn-block my-2 chooseButton" >CHOOSE A FILE</button>
                            <input type="file" id="image" name="image" onChange={(e) => {
                                setFieldValue('image', e.target.files[0])
                                setChosenFile(URL.createObjectURL(e.target.files[0]))
                            }} hidden="hidden" ref={realButton} accept="image/*" />
                        </div>
                        <div className="form-group d-flex flex-column">
                            {chosenFile && <img src={chosenFile} alt="" className="chosenImage " />}
                            <div className="form-group my-3">
                            {chosenFile && <span>Add Caption:</span>}
                            {chosenFile && <Field as="textarea" name="description" className="form-control"></Field>}
                        </div>
                        </div>
                       
                        <div className="form-group">
                        {chosenFile &&  <button type="submit" className="mb-3 submit-btn align-self-start" disabled={!chosenFile ||isSubmitting}>{isSubmitting ? 'Posting' : 'Share'} </button>}
                        </div>
                    </Form>
                )}
            </Formik>


        </div>
    )
}

export default PostCreate
