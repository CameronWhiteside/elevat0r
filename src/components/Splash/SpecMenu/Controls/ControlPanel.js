import { useEffect } from 'react'
import './ControlPanel.css'
import ElevatorControls from './ElevatorControls.js'

const Controls = ({ completedSystem, setCompletedSystem, setConfigureMode }) => {


    return (
        <>
            {
                <ElevatorControls setCompletedSystem={setCompletedSystem} setConfigureMode={setConfigureMode} elevatorCount={completedSystem.elevators.length} floorCount={completedSystem.floors.length} />
            }
            </>
    )
}


export default Controls
