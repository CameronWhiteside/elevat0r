import './ToggleItem.css'

const ToggleItem = ({
    id,
    description,
    additionalInfo,
    max,
    min,
    increment,
    value,
    setValue
}) => {

    const lowerValue = () => {
        let change = increment || 1
        if (value > min) {
            setValue(value - change)
        }
    }

    const raiseValue = () => {
        let change = increment || 1
        if (value < max) {
            setValue(value + change)
        }
    }

    return (
        <div className="toggle-container" id={id}>
            <div className="left-part">
                <h4>{description}</h4>
                { additionalInfo &&
                    <h6>{additionalInfo}</h6>
                }
            </div>
            <div className="right-part">
                <div className="minus" onClick={lowerValue}>-</div>
                <input disabled className="toggle-value" value={value} onChange={(e) => { setValue(e.target.value) }}></input>
                <div className="plus" onClick={raiseValue}>+</div>
            </div>
        </div>
    )
}

export default ToggleItem
