import { useState } from "react"
import './FloorControls.css'

const FloorControls = ({level, height, firstLevel, lastLevel}) => {
    const [upActive, setUpActive] = useState(false)
    const [downActive, setdownActive] = useState(false)

    const onUpClick = () => {
        setUpActive(true)
        console.log(`Going up on floor ${level}`)
    }

    const onDownClick = () => {
        setdownActive(true)
        console.log(`Going down on floor ${level}`)
    }

    return (
        <div className="floor-controls" style={{height, bottom: 0}}>
            {level !== lastLevel && <div style={{maxWidth: height/3}} className={`control-button up-button up-active-${upActive}`} onClick={onUpClick} />}
            {level !== firstLevel && <div style={{maxWidth: height/3}} className={`control-button down-button down-active-${downActive}`} onClick={onDownClick} />}
        </div>
    )
}

export default FloorControls
