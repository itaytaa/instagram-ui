import React, { useState, useEffect } from 'react'
import './Profile.scss'
import { PostService } from '../services/post.services';
import { useHistory, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader/ProfileHeader';



function Profile() {
    const [posts, setPosts] = useState([])
    const { username } = useParams()
    const history = useHistory()
    useEffect(() => {
        async function Posts() {
            try {
                const postsList = await PostService.getPosts(username)
                setPosts(postsList)
            } catch (err) {
                console.log(err)
            }
        }
        Posts()
        window.scrollTo(0, 0)
    }, [username])



    return (
        <div className="Profile">
            <ProfileHeader username={username} postNum={posts.length} />
            <hr />
            <div className="posts">
                {posts.map((post, index) => <img key={post._id} src={'data:;base64,' + post.image} className="singlePost" alt="" onClick={()=>{history.push(`/post/${post._id}`)}} />)}
            </div>
        </div>
    )
}

export default Profile
