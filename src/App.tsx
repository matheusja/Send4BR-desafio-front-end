import { useEffect, useState } from "react";
import { callSunsetSunrise, DayState, evalDayState, getPosition, Position } from "./positions";

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
    <div>
      <h1>{dayState}</h1>
    </div>
  );
}

export default App;
