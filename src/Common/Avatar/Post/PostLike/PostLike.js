import React, { useState, useEffect, useContext } from 'react'
import { PostService } from '../../../../services/post.services';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from '../../../../user-context'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostLike({ post }) {
    const { user } = useContext(UserContext)
    const [liked, setLiked] = useState(post.likes.includes(user._id))
    const [likesNum, setLikesNum] = useState(post.likes.length)

    useEffect(() => {

    }, [post, liked, user._id])



    async function toggleLike() {
        if (!liked) {
            const res = await PostService.like(post._id)
            setLikesNum(res.likes.length)
            setLiked(true)
        } else {
            const res = await PostService.unLike(post._id, user._id)
            setLikesNum(res.likes.length)
            setLiked(false)
        }

    }

    return (
        <div onClick={toggleLike} >
            {liked ? <span style={{ color: "red" }}><FaHeart /></span> : <span><FaRegHeart /></span>} {likesNum} {likesNum===1? 'Like' :'Likes'}
        </div>
    )
}

export default PostLike
