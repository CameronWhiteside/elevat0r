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

        let targetLevel = request.floor.level //request property

        let currPosition = this.position //reassign through iteration
        let currDirection = this.direction //reassign through iteration
        let nextStop = this.stops.head //reassign through iteration

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
        console.log({optimalStop})
            let result = [
                    this.calculateWaitTime(optimalStop) * waitWeight,
                    this.calculateStopsToDropoff(optimalStop) * stopsWeight,
                    this.calculateDirectionChanges(optimalStop) * changesWeight,
                    this.calculateWaitTime(optimalStop) * energyWeight
            ].reduce((a, e) => a + e)

            console.log(result)
            return result
        }

        assignRequest(request) {
            let { index } = this.calculateStopAddition(request)
            this.stops.insert(index, 'pickup', request.floor.level)
        }

        assignDropOff(dropOff) {
            let { index } = this.calculateStopAddition(dropOff)
            console.log(dropOff)
            this.stops.insert(index, 'pickup', dropOff.floor)
            // console.log(`stops updated at index ${index}`, this.stops)
        }

        updatePosition() {
             // console.log(this.stops.head)
            if (this.stops.head && this.stops.head.level) {
                //check to see if already at nextPosition
                if (this.position === this.stops.head.level) {
                    if (this.direction !== 0) {
                        //specify speed to zero
                        this.direction = 0
                        //pause based on stop type
                        let delay = 0
                        if (this.stops.head.type === 'dropoff') {
                            delay = this.dropOffDelay;
                        } else if (this.stops.head.type === 'pickup') {
                            delay = this.dropOffDelay;
                            console.log('delay', delay)
                        }

                        setTimeout(() => {
                            console.log(`scheduling next step in ${delay} delay`)
                            this.stops.remove(0)
                            console.log(this.stops)
                            this.direction = 0
                            if (this.stops.head && this.stops.head.level) {
                                this.direction = Math.abs(this.stops.head.level - this.position) / (this.stops.head.level - this.position)
                            }
                        }, delay * 1000)

                    }
                } else {
                    console.log('not there yet')

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
            }
            return this.position
        }
    }
