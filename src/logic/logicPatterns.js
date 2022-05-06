//Rules
    //Elevators must stop at all floors requested and must be empty of all passengers before reversing direction.

//Priority -->
    //Time waited for elevator to arrive
        //Assign closest elevator to each floor that is moving in the correct direction
            //if elevator is in correct direction or static, calculate time by speed * distance between current and target floor
            //if elevator is in incorrect direction or has past the target floor, calculate time by speed * (distance from current destination and current floor plus current destination and target)

    //Power expended by elevator system
            //Calculate additional power requried (in terms of floors) to update each elevators plan
                //Calculate distance between target and final destination IF floor is not currently between position and destination
    //Time spent inside the elevator
        //Prioritize elevators with fewer stops
    //Number of times elevators change direction (wear and tear)
        //favor upward movement from low level floors and downward movement from high level floors

//Assumptions
    //All elevators can access any floor
        //Therefore, any passenger can reach any other floor
    //Passengers can only press floor buttons that correspond with their originally selected direction


//Poor data structures for requests
    //Queues are not appropriate to handle requests
