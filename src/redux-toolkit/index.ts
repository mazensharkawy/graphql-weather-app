import { createSlice, PayloadAction, configureStore, getDefaultMiddleware, createAsyncThunk } from "@reduxjs/toolkit"
import { GetCityByName, WeatherData, } from "../GraphQL/queryTypes"
import logger from "redux-logger"
import { client } from "../App"
import { LOAD_WEATHER } from "../GraphQL/queries"
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
interface LoadWeatherVars {
    name: String;
    units: String;
}
export const fetchWeatherByCity = createAsyncThunk(
    'users/fetchWeatherByCity',
    async (arg, thunkAPI) => {
        const state = <State>thunkAPI.getState()
        const { city, units }: WeatherSettings = state.weatherSettings
        const data = await client.query<{ query: GetCityByName, variables: LoadWeatherVars }>({ query: LOAD_WEATHER, variables: { name: city, units } })
        return data.data
    }
)
const weatherData = createSlice({
    name: 'weatherData', initialState: WeatherDataInitialState, reducers: {
        setWeatherData: (state, action: PayloadAction<WeatherData>) => state = action.payload,
    },
    extraReducers: {
        [fetchWeatherByCity.fulfilled.toString()]: (state, action) => action?.payload?.getCityByName

    }
})
const weatherSettings = createSlice({
    name: 'weatherSettings', initialState: WeatherSettingsInitialState, reducers: {
        editSearchInput: (state, action: PayloadAction<string>) => ({ ...state, city: action.payload, }),
        setUnits: (state, action: PayloadAction<string>) => ({ ...state, units: action.payload, }),
    }
})

export const {
    setWeatherData,
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