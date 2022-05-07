import { arrayMoveImmutable } from 'array-move';
import SortableList from './optimizationList/SortableList.js';
import ToggleItem from "./controlledInputs/ToggleItem.js"
import './SystemGenerator.css'
import System from "../../../models/system.js";
import Controls from "./buttonPanels/ControlPanel.js";


const SystemGenerator = ({
    floorCount,
    setFloorCount,
    elevatorCount,
    setElevatorCount,
    speed,
    setSpeed,
    computationInterval,
    setComputationInterval,
    onboardingDelay,
    setOnboardingDelay,
    offboardingDelay,
    setOffboardingDelay,
    ranks,
    setRanks,
    configurationMode,
    setConfigurationMode,
    setCompletedSystem,
    completedSystem
}) => {

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setRanks(prevItem => (arrayMoveImmutable(prevItem, oldIndex, newIndex)));
    };

    const onGenerateSystem = () => {
        let waitRank = 4 - ranks.indexOf('Shortest Wait Time')
        let changesRank = 4 - ranks.indexOf('Minimal Direction Change')
        let stopsRank = 4 - ranks.indexOf('Fewest Stops')
        let energyRank = 4 - ranks.indexOf('Energy Efficiency')
        let waitWeight = waitRank * 150
        let changesWeight = changesRank * 150
        let stopsWeight = stopsRank * 170
        let energyWeight = energyRank * 200
        let weights = {
            waitWeight,
            stopsWeight,
            changesWeight,
            energyWeight
        }

        if(completedSystem.intervals) completedSystem.intervals.forEach(interval => clearInterval(interval))

        let newSystem = new System(
            floorCount,
            elevatorCount,
            computationInterval,
            speed,
            onboardingDelay,
            offboardingDelay,
            weights
        )

        setCompletedSystem(newSystem)
        setConfigurationMode(false)
    }


    let floorProps = {
        id: 'floorCount',
        description: 'Floor Count',
        max: 22,
        min: 2,
        value: floorCount,
        setValue: setFloorCount
    }

    let elevatorProps = {
        id: 'elevatorCount',
        description: 'Elevator Count',
        max: 6,
        min: 1,
        value: elevatorCount,
        setValue: setElevatorCount
    }

    let speedProps = {
        id: 'travelSpeed',
        description: 'Travel Speed',
        additionalInfo: 'floors per second',
        max: 5,
        min: 0.5,
        increment: 0.5,
        value: speed,
        setValue: setSpeed
    }

    let computationIntervalProps = {
        id: 'computationalInterval',
        description: 'Computation Interval',
        additionalInfo: 'updates per second',
        max: 40,
        min: 5,
        value: computationInterval,
        setValue: setComputationInterval
    }

    let onboardingDelayProps = {
        id: 'onboardingDelay',
        description: 'Onboarding Delay',
        additionalInfo: 'seconds',
        max: 10,
        min: 0,
        value: onboardingDelay,
        setValue: setOnboardingDelay
    }

    let offboardingDelayProps = {
        id: 'offboardingDelay',
        description: 'Offboarding Delay',
        additionalInfo: 'seconds',
        max: 10,
        min: 0,
        value: offboardingDelay,
        setValue: setOffboardingDelay
    }

    let menuItems = [
        floorProps,
        elevatorProps,
        speedProps,
        computationIntervalProps,
        onboardingDelayProps,
        offboardingDelayProps
    ]

    return (
        <div className="main-menu">
        { configurationMode ?
        <>
        <div className="spec-menu left">
            {menuItems.map(item =>
                <ToggleItem
                    id={item.id}
                    key={item.id}
                    description={item.description}
                    additionalInfo={item.additionalInfo}
                    max={item.max}
                    min={item.min}
                    increment={item.increment}
                    value={item.value}
                    setValue={item.setValue}
                    />)
                }
            </div>
            <div className="spec-menu right">
                <h4>Optimization Priority:</h4>
                <SortableList items={ranks} onSortEnd={onSortEnd} />
                <button className="generate-system" onClick={onGenerateSystem}>Generate System</button>
            </div>
                </>
                :
                <Controls
                    completedSystem={completedSystem}
                    setCompletedSystem={setCompletedSystem}
                    setConfigureMode={setConfigurationMode}
                />
        }
        </div >
    )
}

export default SystemGenerator
