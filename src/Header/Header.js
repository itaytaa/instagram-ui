import React from 'react'
import './Header.scss'
import HeaderAvatar from './HeaderAvatar/HeaderAvatar'
import { faHome} from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu/Menu'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Header() {

   
    return (
        <header className="Header ">
            <nav className="navbar navbar-light" >
                <div className="container header-container">
                    <Link  to="/" className="nav-link d-md-none">
                    <FontAwesomeIcon icon={faHome}/>
                </Link>
                    <a className="navbar-brand d-none d-md-block" href="/">Instagram</a>
                    <Menu />
                    <div className="nav ml-auto mx-3">
                        <HeaderAvatar />
                    </div>




                </div>


            </nav>


        </header>
    )
}

export default Header
