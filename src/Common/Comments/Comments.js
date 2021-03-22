import React, { useState, useEffect } from 'react'
import CommentAdd from './CommentAdd/CommentAdd'
import { PostService } from '../../services/post.services'
import Comment from './Comment/Comment'
import './Comments.scss';

function Comments({ postId }) {



    const [comments, setComments] = useState([])
    const[isChanged, setIsChanged] = useState(false)
    useEffect(() => {

        async function getComments() {
            try {
                const commentsArr = await PostService.getComments(postId)
                setComments(commentsArr)
            } catch (err) {
                console.log(err)
            }
        }
        getComments()
        setIsChanged(true)
    }, [postId, isChanged])

    function onCommentAdd(comment) {
        setComments([...comments, comment])
        window.scrollTo(0, document.body.scrollHeight)
    }
    // function deleteComment(comment) {
    //     setComments([comment,...comments])
    // }

    return (

        <div className="mt-0 mt-sm-5">
            <h2 className="h6">Comments</h2>


            <CommentAdd postId={postId} onCommentAdd={onCommentAdd} />
            <div className="comments-container my-2">
                {comments.map((comment, index) => {
                    return <Comment comment={comment} key={index} setIsChanged={setIsChanged}/>

                })}
            </div>
        </div>
    )
}

export default Comments
