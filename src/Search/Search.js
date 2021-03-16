import React, { useState, useEffect } from 'react'
import './Search.scss'
import { UserService } from '../services/user.service';
import SearchResult from './SearchResult/SearchResult';


function Search() {
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])


    useEffect(() => {
        if (!query) {
            setUsers([])
            return
        }
        async function getUsers() {
            try {
                setUsers(await UserService.search(query))
            } catch (err) {
                console.log(err)
            }
        }
        getUsers()
    }, [query])


   


    function hasNoResults() {
        return users.length === 0 && query.length > 0
    }



    return (
        <div className="Search d-flex flex-column align-items-center">
            <h1 className="search-header my-4">search!</h1>
            <form>
                <input type="search" value={query} onChange={(e)=>{setQuery(e.target.value)}} />
            </form>
            <div className="search-result-box w-75 p-2">
                {users.map(user => {
                    return <SearchResult user={user} key={user._id} />
                })}
            </div>
            {hasNoResults() && <div>Sorry, no users found...</div>}
        </div>
    )
}

export default Search
