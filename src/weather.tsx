import { useSelector } from 'react-redux';
import './App.css';

import { WeatherData } from './GraphQL/queryTypes';
import { State } from './redux-toolkit';


function App() {
    const weather: WeatherData = useSelector((state: State) => state.weatherData)
    return (
        <p>
            {JSON.stringify(weather)}
        </p>
    );
}

export default App;
