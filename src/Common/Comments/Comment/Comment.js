import React, { useEffect } from 'react'
import Avatar from '../../Avatar/Avatar'
import Moment from 'react-moment';
import './Comment.scss'
function Comment({ comment }) {

    //   console.log()

    return (
        <div className=" comment-div my-2 px-2">
            <div className=" my-2">
            <span ><Avatar image={comment.user.avatar} size="md" /></span><span className="mx-2">{comment.user.username}</span>
            </div>
           
            <p className="m-0">{comment.content}</p>
            <span className="timeOfPost"> <Moment fromNow ago="DD/MM/YYYY">{comment.createdAt}</Moment></span>
        </div>
    )
}

export default Comment
