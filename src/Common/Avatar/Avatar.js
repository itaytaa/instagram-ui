import React from 'react'
import './Avatar.scss'
import avatarDefault from './avatar.png'
import PropTypes from 'prop-types';





function Avatar(props) {
    let image =props.image || avatarDefault;
    if (props.image) {
        image = 'data:;base64,' + image
    }
    const size = "Avatar-" + props.size || 'Avatar-md';
    return (
        <img className={size} src={image} alt="avatar" />
    )
}
Avatar.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default Avatar
