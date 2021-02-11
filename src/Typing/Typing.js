import React from 'react'
import Typewriter from "typewriter-effect";
import './Typing.scss'
function Typing() {
    return (
        <div className="Typing">
            <Typewriter
                onInit={(typewriter) => {
                    
                    typewriter.pauseFor(2000).typeString("Little moments that count").start()
                  
                    //  <br>   umm  <br>I\'ve add my projects that I built and it\'s all in the Gallery Tab .<br> click it and see what i\'ve been doing on friday nights in the last six months.  "
                }}

            />
        </div>
    )
}

export default Typing
