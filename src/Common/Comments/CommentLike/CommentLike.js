
import './CommentLike.scss'

import React, { useState, useEffect, useContext } from 'react'
import { PostService } from '../../../services/post.services';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from '../../../user-context'



function CommentLike({ comment }) {


    const { user } = useContext(UserContext)
    const [liked, setLiked] = useState(comment.likes.includes(user._id))
    const [likesNum, setLikesNum] = useState(comment.likes.length)



    async function toggleCommentLike() {
        if (!liked) {
            const res = await PostService.likeComment(comment._id)
            setLikesNum(res.likes.length)
            setLiked(true)
        }
         else {
            
            const res = await PostService.unLikeComment(comment._id, user._id)
            setLikesNum(res.likes.length)
            setLiked(false)
        }

    }
    console.log(liked)

    return (
        <div onClick={toggleCommentLike}  className="Likes">
            {liked ? <span><span style={{ color: "red" }}><FaHeart /> </span>You {likesNum === 1 ? `Liked it` : `and ${likesNum - 1} more liked it`}</span> : <span><FaRegHeart /> {likesNum} {likesNum === 1 ? 'Like' : `Likes`}</span>}
        </div>
    )
}

export default CommentLike
