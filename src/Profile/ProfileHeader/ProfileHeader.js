import React, { useState, useEffect } from 'react'
import Avatar from '../../Common/Avatar/Avatar';
import { UserService } from '../../services/user.service';


function ProfileHeader({ username, postNum }) {

    const [user, setUser] = useState({})

    useEffect(() => {
        async function getUser() {
            try {
                const user = await UserService.getUser(username)
                setUser(user)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [username])



    return (
        <div className="ProfileHeader">
            <h2 className="m-3">{username}</h2>
            <span class="m-3"> <Avatar image={user.Avatar} size="lg" /></span>
            <span className="posts-number m-3">{postNum} Posts </span>
        </div>
    )
}

export default ProfileHeader
