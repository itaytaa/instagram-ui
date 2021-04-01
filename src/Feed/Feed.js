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
            } catch (err) {
                console.log(err)
            }
        }
        getPosts()
    }, [])


    return (
        <div className="Feed  px-lg-5">
            {posts.length === 0 && <div className="feed-note">If your'e new here , Welcome! <br />
            You can upload photos by clicking on the + button,<br />
            Search for people to follow by clicking the search icon<br />
             (Look for me by the name "itayT" and follow me!)<br />
            Edit your User by clicking "Edit user" <br />
            with the green button
            </div>}



            {posts.map((post) => <Post key={post._id} post={post} />

            )}

        </div>
    )
}

export default Feed
