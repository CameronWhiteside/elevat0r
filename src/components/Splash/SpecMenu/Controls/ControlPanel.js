import { useEffect } from 'react'
import './ControlPanel.css'
import ElevatorControls from './ElevatorControls.js'

const Controls = ({ completedSystem }) => {


    return (
        <ElevatorControls elevatorCount={completedSystem.elevators.length} floorCount={completedSystem.floors.length}/>
    )
}


export default Controls
