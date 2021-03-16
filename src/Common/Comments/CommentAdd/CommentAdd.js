import React, { useState } from 'react'
import { PostService } from '../../../services/post.services'


function CommentAdd({ postId,onCommentAdd}) {

    const [content, setContent] = useState('')

    async function submit(e) {
        e.preventDefault()
     
        try {
            const comment = await PostService.addComment(postId, content)
            onCommentAdd(comment)
        } catch (err) {

        }

    }


    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group mb-2">
                    <textarea type="text" className="form-control" value={content} id="textArea" placeholder="Enter text" onChange={(e) => { setContent(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Share</button>
            </form>



        </div>
    )
}

export default CommentAdd
