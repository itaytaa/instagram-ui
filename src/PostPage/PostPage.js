import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PostPage.scss'
import { PostService } from '../services/post.services';
import Avatar from '../Common/Avatar/Avatar';
import Moment from 'react-moment';
import 'moment-timezone';
import PostLike from '../Common/Avatar/Post/PostLike/PostLike';
import Comments from '../Common/Comments/Comments';




function PostPage() {
    const [isClicked, setIsClicked] = useState(false)
    const { id } = useParams()
    const [post, setPost] = useState(null)

    function dClickLike() {
        if (!isClicked) {
            setIsClicked(true)
        }
    }
    useEffect(() => {
        async function getPost() {
            try {
                const p = await PostService.getPost(id)
                p ? setPost(p) : console.log('not found')
            } catch (err) {
                console.log(err)
            }
        }
        getPost()
        window.scroll(0,0)
    }, [id])



    return (
        <div className="PostPage mt-3  p-2">
            {post && (
                <div style={{ margin: "10px " }} className="singlePost-container d-flex flex-column" >
                  <Link to={`/Profile/${post.user.username}`}>
                    <div>
                        <Avatar size="md" username={post.user.username} image={post.user.avatar} />
                        <span className="name"> {post.user.username}</span>
                    </div>
                    </Link>
                 
                    <div className="d-flex flex-column justify-content-center">
                        <img src={'data:;base64,' + post.image} className="post-pic" alt="singlePost-Img" onDoubleClick={dClickLike} />
                    </div>
                    <div className="caption">{post.description}</div>
                    <PostLike post={post} isDbLike={isClicked} setIsClicked={setIsClicked} />
                    <div className="post-date"><Moment fromNow="YYYY/MM/DD">{post.createdAt}</Moment></div>
                    <hr/>
                </div>

            )}
            {post && <div className="comments-section mb-5"><Comments postId={post._id} /></div>}
        </div>
    )
}

export default PostPage
