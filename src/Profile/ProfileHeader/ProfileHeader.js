import React, { useState, useEffect, useContext } from 'react'
import Avatar from '../../Common/Avatar/Avatar';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../user-context'
import './ProfileHeader.scss'

function ProfileHeader({ username, postNum }) {

    const { user } = useContext(UserContext)
    const [isfollowing, setisFollowing] = useState(null)
    const [profileUser, setUser] = useState({})




    async function toggleFollow() {

        if (profileUser.followers.includes(user._id)) {
            const res = await UserService.unFollow(profileUser._id)
            if (res) {
                setisFollowing(false)
            }
        } else {
            const res = await UserService.follow(profileUser._id)
            if (res) {
                setisFollowing(true)
            }
        }

    }

    useEffect(() => {
        (async () => {
            try {
                const user = await UserService.getUser(username)
                setUser(user)
                // setisFollowing(profileUser.followers.includes(user._id))     //    error message "includes of undefined"  
            } catch (err) {
                console.log(err)
            }
        })()
    }, [username, isfollowing])

    function isMe() {
        return profileUser._id !== user._id
    }
    
    function amIFollowing(){
        return (profileUser.followers && profileUser.followers.includes(user._id) ? "Unfollow" : "Follow")
    }


    return (
        <div className="ProfileHeader">
            <div>
                <h2 className="m-3">{profileUser.username}</h2>
                <span className="m-2"><Avatar image={profileUser.avatar} size="lg" username={username} /></span>
                <span className="posts-number m-2">{postNum} Posts </span>
                {/* <span className="posts-number m-3">{profileUser.followers.length} Followers </span>      ERROR: LENGTH OF UNDEFINED   */}
                <span className="posts-number mr-2">{profileUser.followers ? profileUser.followers.length : 0} Followers </span>
                {isMe() && <button className="isFollowingButton" onClick={toggleFollow}>{amIFollowing()}</button>}
            </div>
            <p className="bio my-3"> {profileUser.bio}</p>
        </div>
    )
}

export default ProfileHeader
