import './ControlPanel.css'
import ElevatorControls from './ElevatorControls/ElevatorControls.js'

const Controls = ({ completedSystem, setCompletedSystem, setConfigureMode }) => {


    return (
        <>
            {
                <ElevatorControls
                    setCompletedSystem={setCompletedSystem}
                    completedSystem={completedSystem}
                    setConfigureMode={setConfigureMode}
                    elevatorCount={completedSystem.elevators.length}
                    floorCount={completedSystem.floors.length} />
            }
            </>
    )
}


export default Controls
