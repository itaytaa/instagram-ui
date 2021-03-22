import React, { useState } from 'react'
import { PostService } from '../../../services/post.services'
// import Picker from 'emoji-picker-react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import './CommentAdd.scss'




function CommentAdd({ postId, onCommentAdd }) {


    const [content, setContent] = useState('')
    const [isShown, setIsShown] = useState(false)


    const onEmojiClick = (e, emojiObject) => {
        setContent(content + emojiObject.emoji + ' ')

    };

    function ToggleButton(e) {
        e.preventDefault()
        setIsShown(!isShown)
    }

    async function submit(e) {
        e.preventDefault()
        const comment = await PostService.addComment(postId, content)
        console.log(comment)
        onCommentAdd(comment)
        setContent('')
    }


    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group mb-2 d-flex">
                    <textarea type="text" className="form-control" value={content} id="textArea" placeholder="Enter text" onChange={(e) => { setContent(e.target.value) }} />
                    <button className="emojiButton" onClick={ToggleButton}>😃 </button>
                </div>
                {isShown && <div className="emoji-box">
                    <Picker
                        onEmojiClick={onEmojiClick}
                        disableAutoFocus={true}
                        skinTone={SKIN_TONE_MEDIUM_DARK}
                        groupNames={{ smileys_people: "PEOPLE" }}
                        native
                    />

                </div>}
                <button type="submit" className="btn btn-primary">Share</button>
            </form>

        </div>
    )

}

export default CommentAdd
