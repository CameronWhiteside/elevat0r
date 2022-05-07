import System from "../models/system.js"
import { useState } from "react";
export default function Building({defaultBanks, defaultFloors}) {
  const [banks, setBanks] = useState(defaultBanks)
  const [floors, setFloors] = useState(defaultFloors)
  const [tick, setTick] = useState(5)
  const [speed, setSpeed] = useState(3)

  const system = new System(banks, floors, )
  const floorMap = Array.from(Array(floors).keys()).reverse();
  const bankMap = Array.from(Array(banks).keys());

  return (
    <table className="table">
      <tbody>
        {floorMap.map(ix => {
          return (
            <tr key={`floor-${ix}`}>
              {bankMap.map(iy => (
                <td key={`bank-${iy}-${ix}`}>
                  Floor {ix}, Bank {iy}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
