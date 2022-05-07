import System from "../../models/system.js";
import {DropOff} from "../../models/request.js"

describe('System', () => {
    let floorCount = 5
    let bankCount = 3
    let tick = 20
    let speed = 2
    let onboard = 1
    let offboard = 1
    let weights = {
        waitWeight: 100,
        stopsWeight: 100,
        changesWeight: 50,
        energyWeight: 1000
    }

    const system = new System(
        floorCount,
        bankCount,
        tick,
        speed,
        onboard,
        offboard,
        weights)

    test('defines getNearestFloorMatrix()', () => {
        expect(typeof system.getNearestFloorMatrix).toBe('function')
    })

    test('getNearestFloorMatrix() returns a two-dimensional array', () => {
        expect(typeof system.getNearestFloorMatrix()[0]).toBe('object')
    })

    test('elevators are expected to begin at the ground level and remain at rest', () => {
        expect(system.getNearestFloorMatrix()).toEqual(    [
            [ '0', '0', '0' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ]
          ])
    })

    test('Only a single elevator will respond to immediate inital calls to floors 3 and 5', () => {
        system.requestElevator(-1, 4)
        system.requestElevator(1, 0)
        setTimeout(() => {
            expect(system.getNearestFloorMatrix()).toEqual(    [
                [ '-', '0', '0' ],
                [ '-', '-', '-' ],
                [ '-', '-', '-' ],
                [ '-', '-', '-' ],
                [ '4', '-', '-' ]
              ])
        }, 5000)
    })

    test('If all elevators are waiting on floor 3, two different elevators will respond to calls on floors 1 and 5', () => {
        system.elevators.forEach(elevator => elevator.assignDropOff(new DropOff(2)))

        setTimeout(() => {
            system.requestElevator(-1, 4)
            system.requestElevator(1, 0)
        }, 2000)

        setTimeout(() => {
            expect(system.getNearestFloorMatrix()[2].filter(level => level !== '-').length).toEqual(1)
        }, 5000)
    })


})
