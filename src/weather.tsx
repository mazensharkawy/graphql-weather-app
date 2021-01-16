import { useSelector } from 'react-redux';
import './App.css';

import { WeatherData } from './GraphQL/queryTypes';
import { State } from './redux-toolkit';
import styled from "styled-components";

const Container = styled.div`
width: 50vw;
background: lightgray;
border-radius: 10px;
padding: 10vw;
margin: 0 auto;
`

function App() {
    const weather: WeatherData = useSelector((state: State) => state.weatherData)
    if (!weather) return (
        <Container>
            <p>Invalid City Name</p>
        </Container>
    )
    return (
        <Container>
            <p>
                {JSON.stringify(weather)}
            </p>
        </Container>
    );
}

export default App;
