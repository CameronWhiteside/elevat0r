import Elevator from './elevator.js'
import Floor from './floor.js'
import { Request, DropOff } from './request.js'

export default class System {
    constructor(
        floorCount,
        bankCount,
        tick,
        speed,
        onboard,
        offboard,
        weights,
    ) {

        this.elevators = []
        this.intervals = []

        for (let i = 0; i < bankCount; i++) {

            let elevator = new Elevator(i, floorCount, weights, tick, speed, onboard, offboard)
            this.elevators.push(elevator)
            this.intervals.push(setInterval(() => {
                elevator.updatePosition()
                let pageElevator = document.getElementById(`elevator-${i}`)
                pageElevator.style.bottom = `${ elevator.position / floorCount * 600 }px`;
            }, 1000 / tick))
        }

        this.floors = []

        for (let i = 0; i < floorCount; i++) {
            this.floors.push(new Floor(i))
        }

        this.tick = tick;
        this.speed = speed;
        this.startTime = Date.now();
        this.requests = []
        }

    setSpeed(newSpeed) {
        this.speed = newSpeed
    }

    setTick(newTick) {
        this.tick = newTick
    }


    assignElevatorToPickup(request) {
        let rankings = []

        this.elevators.forEach(elevator => {
            rankings.push({
                elevator,
                score: elevator.calculateRequestScore(request)
            })
        })

        let chosenElevator = rankings.reduce((acc, el) => {

            if (acc.score <= el.score) {
                return acc
            } else {
                return el
            }
        }).elevator


        chosenElevator.assignRequest(request)

        return;
    }


    requestElevator(direction, level) {
        let floor = this.floors[level]
        let button = floor.getButton(direction)
        button.activate()
        let request = new Request(floor, button)
        this.requests.push(request)
        this.assignElevatorToPickup(request)
    }



}


// console.log(myBuilding)
