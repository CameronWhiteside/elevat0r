# Rules
* Elevators must stop at all floors requested and must be empty of all passengers before reversing direction.

# Considerations
### Time waited for elevator to arrive
* Assign closest elevator to each floor that is moving in the correct direction
* If elevator is in correct direction or static, calculate time by speed * distance between current and target floor
* if elevator is in incorrect direction or has past the target floor, calculate time by speed * (distance from current destination and current floor plus current destination and target)

### Power expended by elevator system
* Calculate additional power requried (in terms of floors) to update each elevators plan
* Calculate distance between target and final destination IF floor is not currently between position and destination

### Time spent inside the elevator
* Prioritize elevators with fewer stops

### Number of times elevators change direction (wear and tear)
* Favor upward movement from low level floors and downward movement from high level floors

# Assumptions
* All elevators can access any floor
* Therefore, any passenger can reach any other floor
* Passengers may press any number of any buttons upon boarding an elevator


# Data Structuring
* Queues are not appropriate to handle requests, cannot guarantee insertion point
* Required LinkedList (or double) to handle order AND efficient insertion


