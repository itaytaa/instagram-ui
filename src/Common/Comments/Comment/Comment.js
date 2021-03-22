import React, { useState, useEffect, useContext } from 'react'
import Avatar from '../../Avatar/Avatar'
import Moment from 'react-moment';
import './Comment.scss';
import { PostService } from '../../../services/post.services';
import { UserContext } from '../../../user-context'
import CommentLike from '../CommentLike/CommentLike';

import { FaTrashAlt } from "react-icons/fa";




function Comment({ comment, setIsChanged }) {
    const { user } = useContext(UserContext)
    console.log(comment)
    const [isDeleted, setIsDeleted] = useState(false)


    async function removeComment() {
        const removed = await PostService.deleteComment(comment._id)
        if (removed) {
            setIsChanged(false)
        }
    }

    return (
        <div className=" comment-div my-2 ">
            <div className=" my-2 d-flex align-items-center">
                <span className="mx-2"><Avatar image={comment.user.avatar} size="md" /></span>
                <div className="mx-2 w-100 d-flex justify-content-between">
                    <div className="comment-box p-2">
                        <p className="comment-username m-0 p-0">{comment.user.username}</p>
                        <span className="timeOfPost pt-1"> <Moment fromNow ago="DD/MM/YYYY">{comment.createdAt}</Moment></span>
                        <p className="m-0">{comment.content}</p>
                        <div className="d-flex align-items-center">   <CommentLike comment={comment} />
                            {comment.user._id === user._id && <button className="deleteComment" onClick={removeComment}><FaTrashAlt /></button>}
                        </div>



                    </div>

                </div>

            </div>


        </div>
    )
}

export default Comment
