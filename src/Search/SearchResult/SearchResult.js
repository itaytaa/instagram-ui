
import React from 'react'
import Avatar from '../../Common/Avatar/Avatar'
import './SearchResult.scss'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


function SearchResult({ user }) {

    return (
        <div className="SearchResult col-lg-4">
            <Link to={'/profile/' + user.username} className="SearchResult-link" >
                <div className="d-flex align-items-center">
                    <Avatar image={user.avatar} size="md" alt="" />
                    <div className="search-info mx-2 ">
                        <strong>{user.username}</strong>
                        <p className="bio m-0">{user.bio}</p>
                        <p className="my-0">  joined on <Moment format="DD/MM/YY">{user.createdAt}</Moment></p>
                    </div>
                </div>


            </Link>
        </div>


    )
}

export default SearchResult
