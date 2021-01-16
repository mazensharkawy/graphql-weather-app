import { createSlice, PayloadAction, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { WeatherData, } from "../GraphQL/queryTypes"
import logger from "redux-logger"
type WeatherSettings = {
    city: string,
    units: string
}
export type State = { weatherData: WeatherData, weatherSettings: WeatherSettings }

const WeatherDataInitialState: WeatherData | object = {}
const WeatherSettingsInitialState: WeatherSettings = {
    city: "",
    units: "metric"
}
const weatherData = createSlice({
    name: 'weatherData', initialState: WeatherDataInitialState, reducers: {
        setWeatherData: (state, action: PayloadAction<WeatherData>) => state = action.payload,
    }
})
const weatherSettings = createSlice({
    name: 'weatherSettings', initialState: WeatherSettingsInitialState, reducers: {
        editSearchInput: (state, action: PayloadAction<string>) => ({ ...state, city: action.payload, }),
        setUnits: (state, action: PayloadAction<string>) => ({ ...state, units: action.payload, }),
    }
})

export const {
    setWeatherData
} = weatherData.actions

export const {
    editSearchInput,
    setUnits
} = weatherSettings.actions

const reducer = {
    weatherData: weatherData.reducer,
    weatherSettings: weatherSettings.reducer,
}
const middleware = [...getDefaultMiddleware(), logger]
export default configureStore({ reducer, middleware })