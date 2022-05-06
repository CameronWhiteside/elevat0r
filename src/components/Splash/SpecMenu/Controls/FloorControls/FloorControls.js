import { useState } from "react"
import './FloorControls.css'

const FloorControls = ({level, height, firstLevel, lastLevel, completedSystem}) => {
    const [upActive, setUpActive] = useState(false)
    const [downActive, setdownActive] = useState(false)

    const onUpClick = () => {
        setUpActive(true)
        completedSystem.requestElevator(1, level)
    }

    const onDownClick = () => {
        setdownActive(true)
        completedSystem.requestElevator(-1, level)
    }

    return (
        <div className="floor-controls" style={{height, bottom: 0}}>
            {level !== lastLevel && <div style={{maxWidth: height/3}} className={`control-button up-button up-active-${upActive}`} onClick={onUpClick} />}
            {level !== firstLevel && <div style={{maxWidth: height/3}} className={`control-button down-button down-active-${downActive}`} onClick={onDownClick} />}
        </div>
    )
}

export default FloorControls
