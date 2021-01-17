import React, { useEffect, useState } from 'react';
import { editSearchInput, State, setUnits, setWeatherData } from './redux-toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { GetCityByName } from './GraphQL/queryTypes';
import { useQuery } from '@apollo/client';
import { LOAD_WEATHER } from './GraphQL/queries';
import styled from "styled-components";
import { LARGE_SCREEN_BREAK_POINT, MOBILE_BREAK_POINT, TABLET_CONDITION } from './config';

const Container = styled.div`
    margin: 1vw auto;
    width: fit-content;
    display: flex;
    align-items: center;
`
const Input = styled.input`
border-radius: 5px;
  height: 3vw;
  width: 50vw;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  padding: 0.5vw 1.6vw;
  font-size: 1vw;
  color: #717171;
  border: none;
  border: "1px solid #ececec";
  background: white;
  @media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
    height: 9vw;
    font-size: unset;
  }
  @media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
    padding: 9px 30px;
    border-radius: 7px;
    font-size: 20px;
    border:"1.5px solid #ececec";
    height: 60px;
  }
`
const DropDown = styled.select`
border-radius: 5px;
height: 4vw;
width: 13vw;
cursor: pointer;
background: white;
padding: 0.5vw 1.6vw;
color: #717171;
@media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
 width: 37vw;
 height: 10vw;
}
@media only screen and ${TABLET_CONDITION}{
  width: 18.5vw;
}
@media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
  width: 249.6px;
  height: 82px;
  padding: 9px 30px;
  border-radius: 7px;
}
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
