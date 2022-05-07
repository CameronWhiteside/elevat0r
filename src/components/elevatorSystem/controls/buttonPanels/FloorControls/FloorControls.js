import { useState } from "react"
import './FloorControls.css'

const FloorControls = ({level, height, firstLevel, lastLevel, completedSystem}) => {

    const onUpClick = (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active')
            completedSystem.requestElevator(1, level)
        }
    }

    const onDownClick = (e) => {
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active')
            completedSystem.requestElevator(-1, level)
        }
    }

    return (
        <div className="floor-controls" style={{height, bottom: 0}}>
            {level !== lastLevel && <div style={{ maxWidth: height / 3 }} id={`up-${level}`} className={`control-button up-button`} onClick={onUpClick} />}
            {level !== firstLevel && <div style={{ maxWidth: height / 3 }} id={`down-${level}`} className={`control-button down-button`} onClick={onDownClick} />}
        </div>
    )
}

export default FloorControls
