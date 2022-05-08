import { StopList } from './stop.js'

export default class Elevator {

    constructor(id, floors, weights, tick, speed, onboard, offboard) {
        this.id = id
        this.direction = 0;
        this.position = 0;
        this.tick = tick;
        this.speed = speed;
        this.stops = new StopList()
        this.pickUpDelay = onboard
        this.dropOffDelay = offboard
        this.weights = weights
        this.selectedButtons = []
        for (let i = 0; i < floors; i++){
            this.selectedButtons[i] = false
        }
    }

    calculateStopAddition(request) {

        let intendedDirection = 0

        if (request.button && request.button.direction) {
            intendedDirection = request.button.direction //request property
        }

        let targetLevel
        if (request.floor.level) {
            targetLevel = request.floor.level //request property
        } else {
            targetLevel = request.floor
        }

        let currPosition = this.position //will reassign through iteration
        let currDirection = this.direction //will reassign through iteration
        let nextStop = this.stops.head //will reassign through iteration

        let result = { //format result for use in weighted calculations
            index: 0,
            floorsTraveled: 0,
            floorsAdded: 0,
            dropOffs: 0,
            pickUps: 0,
            directionChanges: 0
        }

        let nextDirection = 0 //initialize for empty list
        if (!nextStop) {
            result.floorsTraveled = Math.abs(currPosition - targetLevel)
            result.floorsAdded = Math.abs(currPosition - targetLevel)
            return result
        }

        while (nextStop) {
            //assign upcoming level
            let nextLevel = nextStop.level
            let isBetweenPositionAndNextStop = ((currPosition - targetLevel) * (nextLevel - targetLevel)) < 0
            let hasCompatibleDirection = (intendedDirection === currDirection || currDirection === 0 || intendedDirection === 0)
            if (isBetweenPositionAndNextStop && hasCompatibleDirection) {
                result.floorsTraveled = Math.abs(currPosition - targetLevel)
                result.floorsAdded = Math.abs(currPosition - targetLevel)
                return result
            } else {
                //assign direction of nextStop & next Direction
                let nextType = nextStop.type

                if (nextType === 'pickup') {
                    result.pickUps++
                } else if (nextType === 'dropoff') {
                    result.dropOffs++
                }

                let levelAfter

                if (!nextStop.next) {
                    //if there are no other stops, return final index
                    result.floorsAdded = Math.abs(currPosition - targetLevel)
                    result.floorsTraveled += Math.abs(currPosition - targetLevel)
                    result.index += 1
                    return result
                } else {
                    //calculate updated directions and levels
                    levelAfter = nextStop.next.level
                    if (levelAfter > nextLevel) {
                        if (nextDirection === -1) result.directionChanges++
                        nextDirection = 1
                    } else if (levelAfter < nextLevel) {
                        if (nextDirection === 1) result.directionChanges++
                        nextDirection = -1
                    }

                    currPosition = nextLevel
                    currDirection = nextDirection
                    nextStop = nextStop.next
                    result.index++
                }
            }
        }
    }


        calculateWaitTime(optimalStop) {
            let { floorsTraveled, dropOffs, pickUps } = optimalStop
            let baseTime = floorsTraveled / this.speed
            let pickUpDelays = pickUps * this.pickUpDelay
            let dropOffDelays = dropOffs * this.dropOffDelay
            return baseTime + pickUpDelays + dropOffDelays
        }

        calculateStopsToDropoff(optimalStop) {
            return optimalStop.index
        }

        calculateDirectionChanges(optimalStop) {
            return optimalStop.directionChanges
        }

        calculateEnergyCost(optimalStop) {
            return optimalStop.floorsAdded
        }

    calculateRequestScore(request) {
        // console.log(request)
        let { waitWeight, stopsWeight, changesWeight, energyWeight } = this.weights
        let optimalStop = this.calculateStopAddition(request)
        // console.log({optimalStop})
            let result = [
                    this.calculateWaitTime(optimalStop) * waitWeight,
                    this.calculateStopsToDropoff(optimalStop) * stopsWeight,
                    this.calculateDirectionChanges(optimalStop) * changesWeight,
                    this.calculateEnergyCost(optimalStop) * energyWeight
            ].reduce((a, e) => a + e)

            // console.log(result)
            return result
    }



        assignRequest(request) {
            let { index } = this.calculateStopAddition(request)
            let level = request.floor.level
            if (this.position !== level) {
                this.stops.insert(index, 'pickup', level, request.button.direction)
            } else {

                let direction = request.button.direction === 1 ? 'up' : 'down'
                let button = document.getElementById(`${direction}-${level}`)
                if (button) button.classList.remove(`active`)
            }
        }

        assignDropOff(dropOff) {
            let { index } = this.calculateStopAddition(dropOff)
            if (this.position !== dropOff.floor) {
                this.stops.insert(index, 'dropoff', dropOff.floor)
            } else {
                let button = document.getElementById(`button-${dropOff.floor}-${this.id}`)
                if (button) button.classList.remove("active-floor")
            }
            // console.log(`stops updated at index ${index}`, this.stops)
        }

    updatePosition() {

        const updateNextFloor = () => {
            let nextStopText = document.getElementById(`next-stop-${this.id}`)
            let nextFloor = 'None'
            if (this.stops.head && this.stops.head.level !== undefined) {
                nextFloor = this.stops.head.level
            }
            if(nextStopText) nextStopText.innerHTML = nextFloor
        }

        const deactivateButtons = () => {
            let level = this.position
            let stopType = this.stops.head.type
            if (stopType === 'dropoff') {
                    let button = document.getElementById(`button-${level}-${this.id}`)
                    button.classList.remove('active-floor')
                } else if (stopType === 'pickup') {
                    let direction = (this.stops.head.direction > 0) ? 'up' : 'down'
                    let button = document.getElementById(`${direction}-${level}`)
                    if (button) {
                        button.classList.remove(`active`)
                    }
               }
        }

        updateNextFloor()

        if (this.stops.head && this.stops.head.level !== undefined) {
            //check to see if already at nextPosition
            if (this.position === this.stops.head.level) {
                deactivateButtons()
                    if (this.direction !== 0) {
                        //if elevator was in motion
                        this.direction = 0
                        //pause based on stop type
                        let delay = 0
                        if (this.stops.head.type === 'dropoff') {
                            delay = this.dropOffDelay;
                        } else if (this.stops.head.type === 'pickup') {
                            delay = this.pickUpDelay;
                        }

                        setTimeout(() => {
                            this.stops.remove(0)
                            //calculate next direction
                            if (this.stops.head && this.stops.head.level !== undefined) {
                                this.direction = Math.abs(this.stops.head.level - this.position) / (this.stops.head.level - this.position)
                            }
                        }, delay * 1000)

                    } else {
                        this.direction = 0
                        // this.stops.remove(0)
                    }
                } else {

                    let distanceToNext = this.stops.head.level - this.position
                    if (distanceToNext) {
                        this.direction = Math.abs(distanceToNext) / distanceToNext
                    }
                    let projectedDistance = Math.abs(distanceToNext) / distanceToNext * this.speed / this.tick

                    if (Math.abs(projectedDistance) > Math.abs(distanceToNext)) {
                        this.position = this.stops.head.level
                    } else {
                        this.position += projectedDistance
                    }

                }
        } else {

        }
            return this.position
        }
    }
