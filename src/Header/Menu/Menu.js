import React from 'react'
import './Menu.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from 'js-cookie';

function Menu() {

    function logout() {
        Cookies.remove('instagram-user')
        window.location.reload(false);
    }


    return (
        <ul className="navbar-nav d-flex flex-row">
            <li>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/ProfileEdit">Edit Profile</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className="navbar-item ">
                <Link to="/search" className="createIcon  mx-3">
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
            </li>
            <li>
                <Link to="/post/create" className="createIcon ">
                    <FontAwesomeIcon icon={faPlusSquare} />
                </Link>
            </li>

        </ul>
    )
}

export default Menu
