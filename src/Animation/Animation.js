import React from 'react'
import './Animation.scss'
import pic1 from './Cómo crecer en Instagram- consejos de marketing.webp'
import pic2 from './darkcolors-instagram-theme.png'
import pic3 from './0_XqhMcV3aHAsggAWL.jpg'

function Animation() {
    return (
        <div className="Animation">
            <img className="pic1" src={pic1} style={{width:"300px"}} alt="img"/>
            <img className="pic2" src={pic2} style={{width:"250px"}} alt="img"/>
            <img className="pic3" src={pic3} style={{width:"400px"}} alt="img"/>
        </div>
    )
}

export default Animation
