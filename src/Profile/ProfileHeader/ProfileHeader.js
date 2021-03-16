import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import Avatar from '../../Common/Avatar/Avatar';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../user-context'

function ProfileHeader({ username, postNum, _id }) {
    const { user } = useContext(UserContext)
    const history = useHistory()
    const [profileUser, setUser] = useState({})

    // console.log(user.username)
    // console.log(username)


    function moveToEdit() {

        history.push('/ProfileEdit')

    }

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
            <span className="m-3"> <Avatar image={profileUser.Avatar} size="lg" username={username} /></span>
            <span className="posts-number m-3">{postNum} Posts </span>
            {username === user.username && <button onClick={moveToEdit}> Edit User</button>}
        </div>
    )
}

export default ProfileHeader
