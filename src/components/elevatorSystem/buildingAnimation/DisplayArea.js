import Floors from './Floors/Floors.js'
import Elevators from './Elevators/Elevators.js'
import './DisplayArea.css'

const DisplayArea = (
    { floorCount,
        elevatorCount,
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
                <Elevators elevatorCount={elevatorCount}/>
                <div className='button-container'>

                </div>
            </div>
        <div className='data-level'></div>
    </div>
    )
}

export default DisplayArea
