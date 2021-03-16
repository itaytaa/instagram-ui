import React from 'react'

function Slider({min,max,value,handleChange}) {
    return (
        <div className="slider-container my-2">
            <input 
            type="range"
             className="slider"
             min={min}
             max={max}
             value={value}
             onChange={handleChange}
             />
        </div>
    )
}

export default Slider
