import React, { useState, useEffect, useContext } from 'react'
import { PostService } from '../../../../services/post.services';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from '../../../../user-context'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostLike({ post, isDbLike,setIsClicked }) {
    const { user } = useContext(UserContext)
    const [liked, setLiked] = useState(post.likes.includes(user._id))
    const [likesNum, setLikesNum] = useState(post.likes.length)

    useEffect(() => {

    }, [post, liked, user._id])


    useEffect(() => {
        if(isDbLike){
            toggleLike()
           setIsClicked(false)
        }
       
    }, [isDbLike])




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
            {liked ? <span><span style={{ color: "red" }}><FaHeart /> </span>You {likesNum===1?`Liked it`:`and ${likesNum-1} more liked it`}</span> : <span><FaRegHeart /> {likesNum} {likesNum === 1 ? 'Like' : `Likes`}</span>}  
        </div>
    )
}

export default PostLike
