import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './PostPage.scss'
import { PostService } from '../services/post.services';
import Avatar from '../Common/Avatar/Avatar';
import Moment from 'react-moment';
import 'moment-timezone';
import PostLike from '../Common/Avatar/Post/PostLike/PostLike';
import Comments from '../Common/Comments/Comments';



function PostPage() {
    window.scrollTo(0, 0)
    const { id } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        // console.log(post)
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
        window.scrollTo(0, 0)
    }, [id])



    return (
        <div className="PostPage mt-3  p-2">
            {post && (
                <div style={{ margin: "10px " }} className="singlePost-container d-flex flex-column" >
                    <div><Avatar size="md" username={post.user.username} /><span className="name"> {post.user.username}</span> </div>
                    <div className="d-flex justify-content-center"><img src={'data:;base64,' + post.image} className="post-pic" alt="singlePost-Img" /></div>
                    <div className="caption">{post.description}</div>
                    <PostLike post={post} />
                    <div className="post-date"><Moment fromNow="YYYY/MM/DD">{post.createdAt}</Moment></div>

                </div>




            )

            }

            {post && <div className="comments-section mb-5"><Comments postId={post._id} /></div>}



        </div>
    )

}

export default PostPage
