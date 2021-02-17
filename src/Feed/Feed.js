import React, { useEffect } from 'react'
import { PostService } from '../services/post.services'
import './Feed.scss'
function Feed() {

    useEffect(() => {
        async function getPosts() {
            try {
                const posts = await PostService.feed()
                console.log(posts)
            } catch (err) {
                console.log(err)
            }
        }
        getPosts()
    }, [])


    return (
        <div>
            FEED
        </div>
    )
}

export default Feed
