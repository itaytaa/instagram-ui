import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './PostPage.scss'
import { PostService } from '../services/post.services';
import Avatar from '../Common/Avatar/Avatar';
import Moment from 'react-moment';
import 'moment-timezone';



function PostPage() {
    const { id } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        async function getPost() {

            try {
                const p = await PostService.getPost(id)
                if (p) {
                    setPost(p)
                } else {
                    console.log('not found')
                }

            } catch (err) {

            }

        }
        getPost()
    }, [id])



    return (
        <div className="PostPage mt-5 vh-100">
            {post && (
                <div style={{ margin: "10px " }} className="singlePost-container d-flex flex-column" >
                    <div><Avatar size="md" /><span className="name"> {post.user.username}</span> </div>
                    <div className="d-flex justify-content-center"><img src={'data:;base64,' + post.image} className="post-pic" /></div>
                    <div className="caption">{post.description}</div>
                    <div className="post-date"><Moment fromNow="YYYY/MM/DD">{post.createdAt}</Moment></div>
                </div>

            )}

        </div>
    )

}

export default PostPage
