import React, { useState, useEffect } from 'react'
import CommentAdd from './CommentAdd/CommentAdd'
import { PostService } from '../../services/post.services'
import Comment from './Comment/Comment'
function Comments({ postId }) {



    const [comments, setComments] = useState([])

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
    }, [postId])

    function onCommentAdd(comment) {
        setComments([...comments, comment])
        window.scrollTo(0,document.body.scrollHeight)
    }

    return (

        <div className="">
            <h2 className="h5">Comments</h2>


            <CommentAdd postId={postId} onCommentAdd={onCommentAdd} />
            <div className="comments-container my-2">
                {comments.map((comment, index) => {
                    return <Comment comment={comment} key={comment.id} onCommentAdd={onCommentAdd} />

                })}
            </div>
        </div>
    )
}

export default Comments
