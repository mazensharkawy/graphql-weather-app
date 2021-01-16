import React, { useEffect, useState } from 'react';
import { editSearchInput, State, setUnits, setWeatherData } from './redux-toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { GetCityByName } from './GraphQL/queryTypes';
import { useQuery } from '@apollo/client';
import { LOAD_WEATHER } from './GraphQL/queries';
import styled from "styled-components";

const Container = styled.div`
    margin: 1vw auto;
    width: fit-content;
`
const Input = styled.input`
    border: 1px solid grey;
    border-radius: 5px;
    width: 50vw;
`
const DropDown = styled.select`
    border: 1px solid grey;
    border-radius: 5px;
`

interface LoadWeatherVars {
    name: String;
    units: String;
}

const UNIT_OPTIONS: string[] = ["metric", "kelvin", "imperial"]
const upperFirst = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1)
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
        <Container>
            <Input placeholder="Search Weather By City" type="text" value={city} onChange={handleInputChange} />
            <DropDown value={units} onChange={handleUnitsChange}>
                {UNIT_OPTIONS.map((unit) => <option value={unit}>{upperFirst(unit)}</option>)}
            </DropDown>
        </Container>
    );
}

export default Search;
