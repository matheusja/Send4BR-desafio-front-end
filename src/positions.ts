import axios from "axios";


export enum DayState {
  Day = "Day",
  Night = "Night"
}

export enum LightState {
  On,
  Off
}

export type Position = {
  lat : number,
  lng : number
}

export type SunriseApi = {
  results : {
   sunrise : Date,
   sunset : Date,
   solar_noon : Date,
   day_length : number,
   civil_twilight_begin : Date,
   civil_twilight_end : Date,
   nautical_twilight_begin : Date,
   nautical_twilight_end : Date,
   astronomical_twilight_begin : Date,
   astronomical_twilight_end : Date
  }
  status : String
}

export function getPosition(withPos : (arg : Position) => void) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) =>  
      withPos({lat : pos.coords.latitude, lng : pos.coords.longitude})
    )
  }
}

export function callSunsetSunrise({lat, lng} : Position) {
  return axios(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`)
}

export function evalDayState(result : SunriseApi) : DayState {
  let time = new Date(Date.now())
  console.log(time)
  console.log(result.results.sunrise)
  console.log(result.results.sunset)
  if (result.results.sunrise < time && time < result.results.sunset) {
    return DayState.Day
  } else {
    return DayState.Night
  }
}

