import './Elevators.css'

const Elevators = ({ elevatorCount }) => {
    let elevators = []
    for (let i = 0; i < elevatorCount; i++)
        elevators.push(317.6/elevatorCount * i)
    return (
        <div className='elevatorContainer'>
            {elevators &&
                elevators.map((qty, i)=> {
                    return (
                    <div
                            className="elevator-shaft"
                            key={qty}
                            style={{
                                left: `${qty - 5}px`,
                                width: `${317.6/elevatorCount}px`
                            }}

                        >
                            <div className='elevator'
                                id={`elevator-${i}`}
                            >
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Elevators;
