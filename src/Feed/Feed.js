import React, { useState, useEffect } from 'react'
import Post from '../Common/Avatar/Post/Post'
import { PostService } from '../services/post.services'
import './Feed.scss'
function Feed() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getPosts() {
            try {
                const posts = await PostService.feed()
                setPosts(posts)
                console.log(posts)
            } catch (err) {
                console.log(err)
            }
        }
        getPosts()
    }, [])


    return (
        <div className="Feed mt-md-5">
            
            {posts.map((post, index) => <Post key={post._id} data={post} />)}
        </div>
    )
}

export default Feed
