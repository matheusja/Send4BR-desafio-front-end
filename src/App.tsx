import { useEffect, useState } from "react";
import Bottom from "./Bottom";
import { callSunsetSunrise, DayState, evalDayState, getPosition, Position } from "./positions";
import "./styles.css"

function App() {
  const [dayState, setDayState] = useState<DayState>(DayState.Day)
  useEffect(() => {
    getPosition((pos) => {
      callSunsetSunrise(pos).then((result) => {
        setDayState(evalDayState(result.data))
      }).catch(() => console.log("erro"))
    })
  })

  return (
    <>
      <div className={`main-${dayState.toLowerCase()}`}>
        <h1>{dayState}</h1>
      </div>
      <Bottom />
    </>
  );
}

export default App;
