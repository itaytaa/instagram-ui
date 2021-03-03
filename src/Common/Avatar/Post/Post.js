import React from 'react'
import Avatar from '../Avatar'
import './Post.scss'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';

function Post({ data }) {
    console.log(data)
    return (
        <div className="d-flex flex-column p-3 m-md-5" >
            <div ><div className="pb-3"><Avatar size="md" className="m-0" />   <span className="name">{data.user.username}</span> </div></div>
            <div className="d-flex flex-column justify-content-center align-items-center"><img src={'data:;base64,' + data.image} className="feed-pic" />
            </div>
            <div className="mt-2">
                <span className="name">{data.user.username}</span>
                <span className="caption m-2">{data.description}</span>
            </div>
            <div className="post-date"><Link to={'/post/' + data._id}>  <Moment fromNow="YYYY/MM/DD">{data.createdAt}</Moment></Link>

            </div>
            <hr />
        </div>
    )
}

export default Post
