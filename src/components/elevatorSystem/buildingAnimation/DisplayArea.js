import Floors from './Floors/Floors.js'
import Elevators from './Elevators/Elevators.js'
import './DisplayArea.css'

const DisplayArea = (
    { floorCount,
        elevatorCount,
        speed,
        computationInterval,
        onboardingDelay,
        offboardingDelay,
        ranks,
        configurationMode,
        completedSystem
    }
) => {


    return (
    <div className='building'>
        <div className='left-panel'></div>
            <div className='main-building'>
                <Floors
                    floorCount={floorCount}
                    configurationMode={configurationMode}
                    completedSystem={completedSystem}
                />
                <Elevators elevatorCount={elevatorCount} completedSystem={completedSystem}/>
                <div className='button-container'>

                </div>
            </div>
        <div className='data-level'></div>
    </div>
    )
}

export default DisplayArea
