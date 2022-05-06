import { useState } from "react"
import System from "../../../../logic/system.js";
import './ElevatorControls.css'

const ElevatorControlPanel = ({elevatorNumber, floorCount}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [nextStop, setNextStop] = useState('None');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState('Idle');

    let buttons = []

    for (let i = 0; i < floorCount; i++) {
        buttons.push(i)
    }

    const selectButton = (elevatorNumber, floorNumber) => {
        console.log(`selecting floor ${floorNumber} for elevator ${elevatorNumber}`)
    }



    return (
        <div className="elevator-control">
            <div className="floor-button-container">
                {buttons.map((button) => {
                    return (
                        <button key={button} onClick={(e) => {
                            selectButton(elevatorNumber, button)
                            e.target.classList.add('active-floor')
                        }} className="floor-button">{button}</button>
                    )
                })}
            </div>
            <div className="elevator-status">
                <h3>Status</h3>
                <h3 className="elevator-state">{status}</h3>
            </div>
            <div className="next-stop">
                <h3>Next Stop</h3>
                <h3 className="elevator-state">{nextStop}</h3>
            </div>
        </div>
    )

}

const ElevatorControls = ({ elevatorCount, floorCount, setCompletedSystem, setConfigureMode }) => {

    const onReset = () => {
        setCompletedSystem(new System(5, 2, 2, 2, 2, 2, {}))
        setConfigureMode(true)
    }

    let elevators = []
    for (let i = 0; i < elevatorCount; i++) { elevators.push(i)}
    return (
        <div className="all-elevator-controls">
            {elevators.map(elevator => <ElevatorControlPanel elevatorNumber={elevator} key={elevator} floorCount={floorCount}/>)}
            <button className='reset-button' onClick={onReset}>Reset</button>
        </div>
    )
}

export default ElevatorControls
