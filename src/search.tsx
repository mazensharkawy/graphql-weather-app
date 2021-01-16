import React, { useEffect, useState } from 'react';
import { editSearchInput, State, setUnits, setWeatherData } from './redux-toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { GetCityByName } from './GraphQL/queryTypes';
import { useQuery } from '@apollo/client';
import { LOAD_WEATHER } from './GraphQL/queries';

interface LoadWeatherVars {
    name: String;
    units: String;
}

const UNIT_OPTIONS: string[] = ["metric", "kelvin", "imperial"]
function Search() {
    const { city, units } = useSelector((state: State) => state.weatherSettings)
    const dispatch = useDispatch();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(editSearchInput(event.target.value))

    const handleUnitsChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch(setUnits(event.target.value))
    let { error, loading, data } = useQuery<GetCityByName, LoadWeatherVars>(LOAD_WEATHER, { variables: { name: city, units } })

    useEffect(() => {
        if (data) {
            dispatch(setWeatherData(data.getCityByName))
        }
    })
    return (
        <div>
            <input type="text" value={city} onChange={handleInputChange} />
            <select value={units} onChange={handleUnitsChange}>
                {UNIT_OPTIONS.map((unit) => <option value={unit}>{unit}</option>)}
            </select>
        </div>
    );
}

export default Search;
