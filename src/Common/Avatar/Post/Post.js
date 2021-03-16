import React from 'react'
import Avatar from '../Avatar'
import './Post.scss'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import PostLike from './PostLike/PostLike';

function Post({post}) {

    return (
        <div className="d-flex flex-column p-3 m-md-5 feed-post" >
            <div > 
               
                <div className="pb-3"> <Link to={`/Profile/${post.user.username}`}> <Avatar size="md" className="m-0" username={post.user.username}/> <span className="name">{post.user.username}</span> </Link>  </div></div>
            <div className="d-flex flex-column justify-content-center align-items-center"><Link to={'/post/' + post._id}><img src={'data:;base64,' + post.image} className="feed-pic" alt="post-pic" /></Link>
            </div>
            <div className="mt-2">
                <span className="name">{post.user.username}</span>
                <span className="caption m-2">{post.description}</span>
            </div>
            <PostLike post={post}  />
            <div className="post-date"><Link to={'/post/' + post._id}>  <Moment fromNow="YYYY/MM/DD">{post.createdAt}</Moment></Link>
            <hr/>
            </div>
            
        </div>
    )
}

export default Post
