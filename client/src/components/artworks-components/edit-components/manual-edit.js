import React, { useEffect, useState } from "react"

export function EditManual ({newImage, setNewImage, multiples, setMultiples, current, setEditRotate}) {
    const [selectedSetting, setSetting] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(200);
    const [value, setValue] = useState(100);
    const [property, setProperty] = useState("brightness")
    const [defaultOptions, setDefaultOptions] = useState([
        {
            name: 'Rotate',
            property: 'rotate',
            value: 0,
            range: {
                min: 0,
                max: 360,
            },
            unit: 'deg'
        },
        {
            name: 'Brightness',
            property: 'brightness',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Contrast',
            property: 'contrast',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Saturate',
            property: 'saturate',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Grayscale',
            property: 'grayscale',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Sepia',
            property: 'sepia',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Hue Rotate',
            property: 'hue-rotate',
            value: 0,
            range: {
                min: 0,
                max: 360,
            },
            unit: 'deg'
        },
        {
            name: 'Fade',
            property: 'opacity',
            value: 100,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Blur',
            property: 'blur',
            value: 0,
            range: {
                min: 0,
                max: 20,
            },
            unit: 'px'
        },
        {
            name: 'Vignette',
            property: 'box-shadow',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: 'px'
        }
    ])

    useEffect(() => {
        if (selectedIndex && selectedSetting) {
            document.getElementById(`filtertile-${selectedIndex}`).scrollIntoView();
        }
    }, [selectedSetting, selectedIndex])

    const goToSetting = (index, pMin, pMax, pVal, pProperty) => {
        setSelectedIndex(index)
        setSetting(false);
        setMin(pMin)
        setMax(pMax)
        setValue(pVal);
        setProperty(pProperty);
        if (pProperty === "rotate") {
            setEditRotate(true);
        }

        if (pProperty === "box-shadow") {
            if (multiples) {
                let temporaryMultiples = multiples.slice();
                temporaryMultiples[current].vignetteBlur = 35;
                temporaryMultiples[current].vignette = true;
                setMultiples(temporaryMultiples);
            } else {
                setNewImage({
                    ...newImage,
                    vignetteBlur: 35,
                    vignette: true
                })
            }
        }
    }

    const cancelSetting = () => {
        setEditRotate(false)
        setSetting(true);
        if (multiples) {
            let temporaryMultiples = multiples.slice();
            temporaryMultiples[current].brightness = (property === "brightness") ? 100 : temporaryMultiples[current].brightness
            temporaryMultiples[current].contrast = (property === "contrast") ? 100 : temporaryMultiples[current].contrast
            temporaryMultiples[current].saturate = (property === "saturate") ? 100 : temporaryMultiples[current].saturate
            temporaryMultiples[current].grayscale = (property === "grayscale") ? 0 : temporaryMultiples[current].grayscale
            temporaryMultiples[current].sepia = (property === "sepia") ? 0 : temporaryMultiples[current].sepia
            temporaryMultiples[current].hue = (property === "hue-rotate") ? 0 : temporaryMultiples[current].hue
            temporaryMultiples[current].opacity = (property === "opacity") ? 100 : temporaryMultiples[current].opacity
            temporaryMultiples[current].blur = (property === "blur") ? 0 : temporaryMultiples[current].blur
            temporaryMultiples[current].rotate = (property === "rotate") ? 0 : temporaryMultiples[current].rotate
            temporaryMultiples[current].vignetteBlur = (property === "box-shadow") ? 0 : temporaryMultiples[current].vignetteBlur
            temporaryMultiples[current].vignetteSpread = (property === "box-shadow") ? 0 : temporaryMultiples[current].vignetteSpread
            temporaryMultiples[current].vignette = (property === "box-shadow") ? false : temporaryMultiples[current].vignette
            setMultiples(temporaryMultiples);
        } else {
            setNewImage({
                ...newImage,
                brightness: (property === "brightness") ? 100 : newImage.brightness,
                contrast: (property === "contrast") ? 100 : newImage.contrast,
                saturate: (property === "saturate") ? 100 : newImage.saturate,
                grayscale: (property === "grayscale") ? 0 : newImage.grayscale,
                sepia: (property === "sepia") ? 0 : newImage.sepia,
                hue: (property === "hue-rotate") ? 0 : newImage.hue,
                opacity: (property === "opacity") ? 100 : newImage.opacity,
                blur: (property === "blur") ? 0 : newImage.blur,
                rotate: (property === "rotate") ? 0 : newImage.rotate,
                vignetteBlur: (property === "box-shadow") ? 0 : newImage.vignetteBlur,
                vignetteSpread: (property === "box-shadow") ? 0 : newImage.vignetteSpread,
                vignette: (property === "box-shadow") ? false : newImage.vignette
            })
        }

        setDefaultOptions([...defaultOptions].map(object => {
            if (object.property === property) {
                return {
                    ...object,
                    value: (property === "brightness" || property === "contrast" || property === "saturate" || property === "opacity") ? 100 : 0
                }
            } else {
                return object;
            }
        }))
    }

    const finishSetting = () => {
        setEditRotate(false)
        setSetting(true);
        setDefaultOptions([...defaultOptions].map(object => {
            if (object.property === property) {
                return {
                    ...object,
                    value: value
                }
            } else {
                return object;
            }
        }))
    }

    const adjustValue = (e) => {
        setValue(e.target.value)

        if (multiples) {
            let temporaryMultiples = multiples.slice();
            temporaryMultiples[current].brightness = (property === "brightness") ? value : temporaryMultiples[current].brightness
            temporaryMultiples[current].contrast = (property === "contrast") ? value : temporaryMultiples[current].contrast
            temporaryMultiples[current].saturate = (property === "saturate") ? value : temporaryMultiples[current].saturate
            temporaryMultiples[current].grayscale = (property === "grayscale") ? value : temporaryMultiples[current].grayscale
            temporaryMultiples[current].sepia = (property === "sepia") ? value : temporaryMultiples[current].sepia
            temporaryMultiples[current].hue = (property === "hue-rotate") ? value : temporaryMultiples[current].hue
            temporaryMultiples[current].opacity = (property === "opacity") ? value : temporaryMultiples[current].opacity
            temporaryMultiples[current].blur = (property === "blur") ? value : temporaryMultiples[current].blur
            temporaryMultiples[current].rotate = (property === "rotate") ? value : temporaryMultiples[current].rotate
            temporaryMultiples[current].vignetteBlur = (property === "box-shadow") ? 35 : temporaryMultiples[current].vignetteBlur
            temporaryMultiples[current].vignetteSpread = (property === "box-shadow") ? value : temporaryMultiples[current].vignetteSpread
            temporaryMultiples[current].vignette = (property === "box-shadow") ? true : temporaryMultiples[current].vignette
            setMultiples(temporaryMultiples);
        } else {
            setNewImage({
                ...newImage,
                brightness: (property === "brightness") ? value : newImage.brightness,
                contrast: (property === "contrast") ? value : newImage.contrast,
                saturate: (property === "saturate") ? value : newImage.saturate,
                grayscale: (property === "grayscale") ? value : newImage.grayscale,
                sepia: (property === "sepia") ? value : newImage.sepia,
                hue: (property === "hue-rotate") ? value : newImage.hue,
                opacity: (property === "opacity") ? value : newImage.opacity,
                blur: (property === "blur") ? value : newImage.blur,
                rotate: (property === "rotate") ? value : newImage.rotate,
                vignetteBlur: (property === "box-shadow") ? 35 : newImage.vignetteBlur,
                vignetteSpread: (property === "box-shadow") ? value : newImage.vignetteSpread,
                vignette: (property === "box-shadow") ? true : newImage.vignette
            })
        }
    }

    return (
        <React.Fragment>
            {selectedSetting
                ? <div className="filterContainer">
                    {defaultOptions.map((option, index) => 
                    <div className="filterTile" key={index} id={`filtertile-${index}`}>
                        <h5 className="filterTitle">{option.name}</h5>
                        <div className="optionSquareContainer">
                                <button className={`filterSquare optionSquare`}
                                    onClick={() => {goToSetting(index, option.range.min, option.range.max, option.value, option.property)}}></button>
                            </div>
                    </div>)}
                </div>
                : <div className="optionSettingContainer">
                    <input type="range" min={min} max={max} value={value} step="1" className="settingRangeSlider" onChange={adjustValue}></input>
                    <div className="settingSelectButtons">
                        <button className="settingCancel" onClick={cancelSetting}>Cancel</button>
                        <button className="settingDone" onClick={finishSetting}>Done</button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}