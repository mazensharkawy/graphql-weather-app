import React, { useEffect, useState } from 'react';
import './App.css';
import { useQuery } from '@apollo/client'
import { LOAD_WEATHER } from './GraphQL/queries'
import { GetCityByName, WeatherData } from './GraphQL/queryTypes';

interface LoadWeatherVars {
    name: String;
    units: String;

}
function App() {
    const { error, loading, data } = useQuery<GetCityByName, LoadWeatherVars>(LOAD_WEATHER, { variables: { name: "cairo", units: "metric" } })
    const [weather, setWeather] = useState<WeatherData | undefined>()
    useEffect(() => {
        if (data) {
            setWeather(data.getCityByName)
        }
    })
    return (
        <p>
            {JSON.stringify(weather)}
        </p>
    );
}

export default App;
