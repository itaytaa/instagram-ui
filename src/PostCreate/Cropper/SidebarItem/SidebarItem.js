import React from 'react'
import './SidebarItem.scss'
function SidebarItem({name, active, handleClick}) {
    return (
        <button className={`SidebarItem  ${active? 'active':''} my-1`}
        onClick={handleClick}
        type="button"
        >
            {name}
        </button>
    )
}

export default SidebarItem
