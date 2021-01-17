import { useSelector } from 'react-redux';
import './App.css';

import { WeatherData } from './GraphQL/queryTypes';
import { State } from './redux-toolkit';
import styled from "styled-components";
import { LARGE_SCREEN_BREAK_POINT, LIGHT_GREY, MOBILE_BREAK_POINT, TABLET_CONDITION } from './config';

const Container = styled.div`
width: 50vw;
display:flex;
justify-content: space-between;
background: ${LIGHT_GREY};
border-radius: 10px;
padding: 10vw;
margin: 0 auto;
@media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
    width: 70vw
  }
@media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
width: 950px
}
`
function App() {
    const weather: WeatherData = useSelector((state: State) => state.weatherData)
    if (!weather || !weather.weather) return (
        <Container>
            <p>Invalid City Name</p>
        </Container>
    )
    const { name, country, weather: { summary, temperature } }: WeatherData = weather
    const { title, description } = summary
    const { actual, min, max } = temperature
    return (
        <Container>
            <div>
                <p>City: {name}</p>
                <p>Country: {country}</p>
            </div>
            <div>
                <p>Title: {title}</p>
                <p>{description}</p>
                <p>{Math.round(actual)}°</p>
                <p>{Math.round(min)}° - {Math.round(max)}°</p>
            </div>
        </Container >
    );
}

export default App;
