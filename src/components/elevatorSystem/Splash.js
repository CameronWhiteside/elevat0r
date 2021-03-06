import { useState } from 'react';
import SystemGenerator from './controls/SystemGenerator.js';
import DisplayArea from './buildingAnimation/DisplayArea.js'
import './Splash.css'

const Splash = () => {

    const [configurationMode, setConfigurationMode] = useState(true)
    const [completedSystem, setCompletedSystem] = useState({})
    const [floorCount, setFloorCount] = useState(5)
    const [elevatorCount, setElevatorCount] = useState(2)
    const [speed, setSpeed] = useState(2)
    const [computationInterval, setComputationInterval] = useState(20)
    const [onboardingDelay, setOnboardingDelay] = useState(1)
    const [offboardingDelay, setOffboardingDelay] = useState(1)
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
                    completedSystem={completedSystem}
                    ranks={ranks}
                />
            </div>
            <div className='left-col column'>
            <header className='title-container'>
                <div className='title-image'/>
                <h1 className='hidden'>Elevat0r</h1>
                <h3>a dynamic lift simulator created by Cameron Whiteside</h3>
                </header>
                <SystemGenerator
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
                    completedSystem={completedSystem}
                    setCompletedSystem={setCompletedSystem}
                />
            </div>
        </>
    )
}

export default Splash;
