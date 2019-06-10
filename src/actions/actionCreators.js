import axios from "axios";
import * as types from "./actionTypes";

const API_KEY = "75f972b80e26f14fe6c920aa6a85ad57";
const cnt = 10;
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&cnt=${cnt}`;

function fetchWeatherStart() {
  const action = { type: types.FETCH_WEATHER_START };
  return action;
}

function fetchWeatherSuccess(data) {
  const action = { type: types.FETCH_WEATHER_SUCCESS, payload: data };
  return action;
}

function fetchWeatherFail(error) {
  const action = { type: types.FETCH_WEATHER_FAIL, payload: error };
  return action;
}

export function fetchWeather(city) {
  const promise = axios({
    url: `${ROOT_URL}&q=${city}`,
    method: "get"
  });
  return function(dispatch) {
    dispatch(fetchWeatherStart());
    return promise
      .then(res => {
        dispatch(fetchWeatherSuccess(res.data));
        return res;
      })
      .catch(error => {
        dispatch(fetchWeatherFail(error));
        return error;
      });
  };
}
