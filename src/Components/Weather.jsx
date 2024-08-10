import { useState, useRef } from "react";
import './Weather.css'; // Import the CSS file

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const userInput = useRef('');

    const getWeather = async () => {
        const API_KEY = "3f868d51911e45eaaea54617241008";
        const city = userInput.current.value;
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
            if (!response.ok) {
                throw new Error('City not found or other error');
            }
            const data = await response.json();
            setWeather(data);
            setError(null);
        } catch (err) {
            setWeather(null);
            setError(err.message);
        }
        userInput.current.value = '';
    };

    return (
        <div className="weather-container">
            <h1 className="weather-title">Weather App</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    ref={userInput} 
                    placeholder="Enter city name" 
                    className="weather-input"
                />
                <button 
                    onClick={getWeather} 
                    className="weather-button"
                >
                    Search Location
                </button>
            </div>
            {weather && (
                <div className="weather-info">
                    <h3 className="weather-location">Weather in {weather.location.name}</h3>
                    <img 
                        src={weather.current.condition.icon} 
                        alt={weather.current.condition.text} 
                        className="weather-icon"
                    />
                    <p className="weather-temperature">Temperature: {weather.current.temp_c}°C</p>
                    <p className="weather-condition">Condition: {weather.current.condition.text}</p>
                </div>
            )}
            {error && <p className="weather-error">Error: {error}</p>}
        </div>
    );
};

export default Weather;
