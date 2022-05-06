import { useState } from "react"
import './ElevatorControls.css'

const ElevatorControlPanel = ({elevatorNumber, floorCount}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editMode, setEditMode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [nextStop, setNextStop] = useState('None');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState('Idle');

    let buttons = []

    for (let i = 0; i < floorCount; i++) {
        buttons.push(i)
    }

    return (
        <div className="elevator-control">
            <div className="floor-button-container">
                {buttons.map((button) => {
                    return (
                        <button key={button} className="floor-button">{button}</button>
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

const ElevatorControls = ({ elevatorCount, floorCount }) => {
    let elevators = []
    for (let i = 0; i < elevatorCount; i++) { elevators.push(i)}
    return (
        <div className="all-elevator-controls">
            {elevators.map(elevator => <ElevatorControlPanel elevatorNumber={elevator} key={elevator} floorCount={floorCount}/>)}
        </div>
    )
}

export default ElevatorControls
