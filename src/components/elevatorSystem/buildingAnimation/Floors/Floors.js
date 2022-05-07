import FloorControls from '../../controls/buttonPanels/FloorControls/FloorControls.js'
import './Floors.css'

const Floors = ({ floorCount, configurationMode, completedSystem }) => {
    let floors = []
    for (let i = 0; i < floorCount; i++)
        floors.push(600/floorCount * i)
    return (
        <div className='floorContainer'>
            {floors &&
                floors.map((qty, i)=> {
                    return (

                            <div
                            className="floor-divider"
                            key={i}
                            style={{
                                bottom: `${qty}px`
                            }}
                            >
                            {!configurationMode && <FloorControls level={i} firstLevel={0} lastLevel={floorCount - 1} height={600 / floorCount} completedSystem={completedSystem} />}
                            </div>
                    )
                })
            }
        </div>
    )
}

export default Floors;
