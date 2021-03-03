import React from 'react'
import './Menu.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
        <ul className="navbar-nav d-flex flex-row">
            <li className="navbar-item ">
                <Link to="/post/create" className="createIcon "><FontAwesomeIcon icon={faPlusSquare} />
                </Link>
            </li>
        </ul>
    )
}

export default Menu
