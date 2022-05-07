import Building from './components/Building.js';
import Splash from './components/elevatorSystem/Splash.js';

// NOTE: env vars are always string, must be converted to number
const BANKS = process.env.BANKS || '3';
const FLOORS = process.env.FLOORS || '5';
// const TICK_DELAY = process.env.TICK_DELAY || '1000';

function App() {
  const banks = parseInt(BANKS, 10);
  const floors = parseInt(FLOORS, 10);
  return (
    <>
      <Splash/>
    </>
  );
}

export default App;
