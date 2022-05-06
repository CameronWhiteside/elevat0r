import { useState } from 'react';
import SpecMenu from './SpecMenu/SpecMenu.js';
import DisplayArea from './DisplayArea/DisplayArea.js'
import './Splash.css'

const Splash = () => {

    const [configurationMode, setConfigurationMode] = useState(true)
    const [completedSystem, setCompletedSystem] = useState({})
    const [floorCount, setFloorCount] = useState(5)
    const [elevatorCount, setElevatorCount] = useState(2)
    const [speed, setSpeed] = useState(2)
    const [computationInterval, setComputationInterval] = useState(2)
    const [onboardingDelay, setOnboardingDelay] = useState(2)
    const [offboardingDelay, setOffboardingDelay] = useState(2)
    const [ranks, setRanks] = useState(['Shortest Wait Time', 'Minimal Direction Change', 'Fewest Stops', 'Energy Efficiency'])

    return (
        <>
            <div className='right-col column'>
                <DisplayArea
                    floorCount={floorCount}
                    elevatorCount={elevatorCount}
                    speed={speed}
                    computationInterval={computationInterval}
                    onboardingDelay={onboardingDelay}
                    offboardingDelay={offboardingDelay}
                    configurationMode={configurationMode}
                    ranks={ranks}
                />
            </div>
            <div className='left-col column'>
            <header className='title-container'>
                <div className='title-image'/>
                <h1 className='hidden'>Elevator Simulator</h1>
                <h3>a dynamic lift simulator created by Cameron Whiteside</h3>
                </header>
                <SpecMenu
                    floorCount={floorCount}
                    setFloorCount={setFloorCount}
                    elevatorCount={elevatorCount}
                    setElevatorCount={setElevatorCount}
                    setSpeed={setSpeed}
                    speed={speed}
                    computationInterval={computationInterval}
                    setComputationInterval={setComputationInterval}
                    onboardingDelay={onboardingDelay}
                    setOnboardingDelay={setOnboardingDelay}
                    setOffboardingDelay={setOffboardingDelay}
                    offboardingDelay={offboardingDelay}
                    ranks={ranks}
                    setRanks={setRanks}
                    configurationMode={configurationMode}
                    setConfigurationMode={setConfigurationMode}
                    setCompletedSystem={setCompletedSystem}
                />
            </div>
        </>
    )
}

export default Splash;
