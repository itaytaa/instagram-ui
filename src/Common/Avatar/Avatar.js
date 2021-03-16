import React from 'react'
import './Avatar.scss'
import avatarDefault from './avatar.png'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
function Avatar(props) {

    const image = props.image || avatarDefault;
    const size = "Avatar-" + props.size || 'Avatar-md';
    return (
      
            <img className={size} src={image} alt="avatar" />
     
    )




}
Avatar.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default Avatar
