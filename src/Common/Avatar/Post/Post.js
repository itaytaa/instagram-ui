import React, { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import './Post.scss'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import PostLike from './PostLike/PostLike';
import { PostService } from '../../../services/post.services';
import { FaComments} from 'react-icons/fa';



function Post({ post }) {

    const [isClicked, setIsClicked] = useState(false)
    const [commentsNum, setCommentsNum] = useState(null)


    function dClickLike() {
        if (!isClicked) {
            setIsClicked(true)
        }
    }

    useEffect(() => {
        async function getCommentsNum() {
            try {
                const comments = await PostService.getComments(post._id)
                setCommentsNum(comments.length)
            } catch (err) {
                console.log(err)
            }
        }
        getCommentsNum()
    }, [post._id])

    return (
        <div className="d-flex flex-column p-3 m-md-5 feed-post" >
            <div >
                <div className="pb-3">
                    <Link to={`/Profile/${post.user.username}`}>
                        <Avatar size="md" className="m-0" username={post.user.username} image={post.user.avatar} />
                        <span className="name">{post.user.username}</span>
                    </Link>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Link to={'/post/' + post._id}>
                <img src={'data:;base64,' + post.image} className="feed-pic" alt="post-pic" onDoubleClick={dClickLike} />
                </Link>
            </div>
            <div className="mt-2">
                <span className="name-underPost">{post.user.username}</span>
                <span className="caption m-2">{post.description}</span>
            </div>
            <PostLike post={post} isDbLike={isClicked} setIsClicked={setIsClicked} />
            <div className="post-date">

                <Link to={'/post/' + post._id}>
                    <div className="comments-number"><FaComments/> {commentsNum} Comments</div>
                </Link>
               <span className="postDate"><Moment fromNow="YYYY/MM/DD">{post.createdAt}</Moment></span> 
                <hr />
            </div>

        </div>
    )
}

export default Post
