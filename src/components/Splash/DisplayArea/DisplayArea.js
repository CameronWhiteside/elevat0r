import Floors from './Floors/Floors.js'
import FloorControls from '../SpecMenu/Controls/FloorControls/FloorControls.js'
import Elevators from './Elevators/Elevators.js'
import './DisplayArea.css'

const DisplayArea = (
    {   floorCount,
        elevatorCount,
        speed,
        computationInterval,
        onboardingDelay,
        offboardingDelay,
        ranks,
        configurationMode
    }
) => {


    return (
    <div className='building'>
        <div className='left-panel'></div>
            <div className='main-building'>
                <Floors floorCount={floorCount} configurationMode={configurationMode}/>
                <Elevators elevatorCount={elevatorCount}/>
                <div className='button-container'>

                </div>
            </div>
        <div className='data-level'></div>
    </div>
    )
}

export default DisplayArea
