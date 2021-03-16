import React, { useState, useRef, useEffect } from 'react'
import './ImageCropper.scss'
import Cropper from 'cropperjs'
import "cropperjs/dist/cropper.min.css"
import SidebarItem from './SidebarItem/SidebarItem';
import Slider from './Slider/Slider';
let canvas;

const DEFAULT_OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Hue-Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: 'deg'
    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: 'px'
    }

]


function ImageCropper({ src, edited }) {


    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, setOptions] = useState(DEFAULT_OPTIONS)
    const selectedOption = options[selectedOptionIndex]
    const [imageDestination, setImageDestination] = useState('')
    const imageElement = useRef()
    const styledImage = useRef()
    // const [style, setStyle] = useState(null)

    function handleSliderChange({ target }) {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option
                return { ...option, value: target.value }
            })
        })
    }




    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return { filter: filters.join(' ') }
    }


    async function edit() {
    console.log('changed')
        try {
            const cropper = new Cropper(imageElement.current, {
                viewMode: 0,
                dragMode: 'move',
                zoomOnTouch: true,
                zoomable: true,
                scalable: false,
                rotatable: true,
                aspectRatio: 1 / 1,
    
                highlight: true,
                dragMode: 'move',
                cropBoxMovable: true,
             
                crop: () => {
                    canvas = cropper.getCroppedCanvas( {width: 1000,
                        height: 1000})

                    setImageDestination(canvas.toDataURL("image/png"))

                },
                rotate:()=>{

                }
            })

            edited(imageDestination, getImageStyle())
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        edit()
    }, [imageDestination,src])



    return (
        <div className="d-flex flex-column align-items-center">
            <div className="img-container">
                <img ref={imageElement} src={src} alt="source" style={getImageStyle()} />
            </div>
            <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                handleChange={handleSliderChange}
            />
            <div className="d-flex align-items-center">
                <img className="img-preview mt-2 " src={imageDestination} alt="Destination" style={getImageStyle()} ref={styledImage} />
                <div className="d-flex flex-column mx-1">
                    {options.map((option, index) => {
                        return (
                            <SidebarItem
                                key={index}
                                name={option.name}
                                active={index === selectedOptionIndex}
                                handleClick={(e) => {
                                    setSelectedOptionIndex(index)
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ImageCropper
