import React, { useState, useRef, useEffect } from 'react'
import './ImageCropper.scss'
import Cropper from 'cropperjs'
import "cropperjs/dist/cropper.min.css"
import SidebarItem from './SidebarItem/SidebarItem';
import Slider from './Slider/Slider';
// let ctx;

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


function ImageCropper({ src, edited, isAvatar }) {

    // const canvasRef = useRef()

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, setOptions] = useState(DEFAULT_OPTIONS)
    const selectedOption = options[selectedOptionIndex]
    const [imageDestination, setImageDestination] = useState('')
    const imageElement = useRef()
    const styledImage = useRef()


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
                cropBoxMovable: true,

                crop:() => {

                    const canvas = cropper.getCroppedCanvas({
                        width: 1000,
                        height: 1000
                    })
                    canvas.fillStyle =getImageStyle()
                    //   heroImage.style.zIndex = "5";
                    setImageDestination(canvas.toDataURL("image/png"))
                    // ctx = canvasRef.current.getContext('2d')
                    // const imageObj1 = new Image();
                    // imageObj1.src = imageDestination
                    // ctx.drawImage(imageObj1, 0, 0, 250, 250);
                    // edited(ctx)
                },

            })


            edited(imageDestination)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        // const ctx = canvasRef.current.getContext('2d')
        // const imageObj1 = new Image();
        // imageObj1.src = imageDestination
        // ctx.drawImage(imageObj1, 0, 0, 250, 250);

        edit()

    }, [imageDestination])



    return (
        <div className="d-flex flex-column align-items-center">
            <div className="img-container">
                <img ref={imageElement} src={src} alt="source" style={getImageStyle()} />
            </div>
            {isAvatar || <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                handleChange={handleSliderChange}
            />}
            <div className="d-flex align-items-center">

                {/* <canvas ref={canvasRef} width="250px" height="250px" style={getImageStyle()} ></canvas> */}
                {isAvatar || <img className="img-preview mt-2 " src={imageDestination} alt="Destination" style={getImageStyle()} ref={styledImage} />}
                {isAvatar || <div className="d-flex flex-column mx-1">
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
                </div>}
            </div>
        </div>
    )
}

export default ImageCropper
