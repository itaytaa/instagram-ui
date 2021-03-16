import React, { useContext } from 'react'
import Avatar from '../../Common/Avatar/Avatar'
import { UserContext } from '../../user-context'
import { Link } from 'react-router-dom'

import './HeaderAvatar.scss'
function HeaderAvatar() {
    const { user } = useContext(UserContext)
 
    return (
        <div className="HeaderAvatar">
          
          <Link to={`/Profile/${user.username}`}><Avatar size="md" username={user.username}/></Link>   
            <span className="d-none d-sm-block mx-2">{user.username}</span>
        </div>
    )
}

export default HeaderAvatar
