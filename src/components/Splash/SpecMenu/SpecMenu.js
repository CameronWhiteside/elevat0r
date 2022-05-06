import { useState } from "react"
import { arrayMoveImmutable } from 'array-move';
import SortableList from './RankList/SortableList.js';
import ToggleItem from "./ToggleItem/ToggleItem.js"
import './SpecMenu.css'
import System from "../../../logic/system.js";
import Controls from "./Controls/ControlPanel.js";




const SpecMenu = ({
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
    setCompletedSystem
}) => {


    const onSortEnd = ({ oldIndex, newIndex }) => {
        setRanks(prevItem => (arrayMoveImmutable(prevItem, oldIndex, newIndex)));
    };

    const onGenerateSystem = () => {
        let waitRank = 5 - ranks.indexOf('Shortest Wait Time')
        let changesRank = 5 - ranks.indexOf('Minimal Direction Change')
        let stopsRank = 5 - ranks.indexOf('Fewest Stops')
        let energyRank = 5 - ranks.indexOf('Energy Efficiency')
        let waitWeight = waitRank * 10
        let changesWeight = changesRank * 10
        let stopsWeight = stopsRank * 10
        let energyWeight = energyRank * 10
        let weights = {
            waitWeight,
            stopsWeight,
            changesWeight,
            energyWeight
        }

        let newSystem = new System(
            floorCount,
            elevatorCount,
            computationInterval,
            speed,
            onboardingDelay,
            offboardingDelay,
            weights
        )

        console.log(newSystem)

        setCompletedSystem(newSystem)
        setConfigurationMode(false)
    }


    let floorProps = {
        id: 'floorCount',
        description: 'Floor Count',
        max: 15,
        min: 2,
        value: floorCount,
        setValue: setFloorCount
    }

    let elevatorProps = {
        id: 'elevatorCount',
        description: 'Elevator Count',
        max: 8,
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
                <Controls/>
        }
        </div >
    )
}

export default SpecMenu
