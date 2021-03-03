import React, { useState, useEffect } from 'react'
import './Profile.scss'
import { PostService } from '../services/post.services';
import { useParams } from 'react-router-dom'
import Post from '../Common/Avatar/Post/Post';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import { Link } from 'react-router-dom';

function Profile() {

    const [posts, setPosts] = useState([])
    const { username } = useParams()

    useEffect(() => {
        async function Posts() {
            try {
                const postsList = await PostService.getPosts(username)
                setPosts(postsList)
            } catch (err) {
                console.log(err)
            }
            console.log(posts)
        }
        Posts()
    }, [username])




    return (
        <div className="Profile">
<ProfileHeader username={username} postNum = {posts.length}/>
            <hr />
            <div className="posts">

                {posts.map((post) => <Link to={'/post/'+ post._id}> <img key={post._id} src={'data:;base64,' + post.image} className="singlePost" /></Link>)}
            </div>



        </div>
    )
}

export default Profile
