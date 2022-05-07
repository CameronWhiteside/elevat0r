import { useState } from "react"
import System from "../../../../../logic/system.js";
import './ElevatorControls.css'
import { DropOff } from "../../../../../logic/request.js";

const ElevatorControlPanel = ({elevatorNumber, floorCount, completedSystem, floorNumber}) => {

    let buttons = []

    for (let i = 0; i < floorCount; i++) {
        buttons.push(i)
    }

    const selectButton = (elevatorNumber, floorNumber, completedSystem) => {
        // console.log(`selecting floor ${floorNumber} for elevator ${elevatorNumber}`)
        completedSystem.elevators[elevatorNumber].assignDropOff(new DropOff(floorNumber))
    }



    return (
        <div className="elevator-control">
            <div className="floor-button-container">
                {buttons.map((button) => {

                    return (
                        <button key={button} id={`button-${button}-${floorNumber}`}onClick={(e) => {
                            selectButton(elevatorNumber, button, completedSystem)
                            e.target.classList.add('active-floor')
                        }} className="floor-button">{button}</button>
                    )
                })}
            </div>
            <div className="next-stop">
                <h3>Next Stop</h3>
                <h3 id={`next-stop-${elevatorNumber}`} className="elevator-state">None</h3>
            </div>
        </div>
    )

}

const ElevatorControls = ({ elevatorCount, floorCount, completedSystem, setCompletedSystem, setConfigureMode }) => {

    const onReset = () => {
        completedSystem.intervals.forEach(interval => clearInterval(interval))
        setCompletedSystem(new System(5, 2, 2, 2, 2, 2, {}))
        setConfigureMode(true)
        for (let i = 0; i < elevatorCount; i++) {
            document.getElementById(`elevator-${i}`).style.bottom = '0px'
        }
    }

    let elevators = []
    for (let i = 0; i < elevatorCount; i++) { elevators.push(i)}
    return (
        <div className="all-elevator-controls">
            {elevators.map((elevator,i) => <ElevatorControlPanel completedSystem={completedSystem} elevatorNumber={elevator} key={elevator} floorCount={floorCount} floorNumber={i}/>)}
            <button className='reset-button' onClick={onReset}>Reset</button>
        </div>
    )
}

export default ElevatorControls
