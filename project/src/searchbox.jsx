import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ onSearch }) { // Use a prop to pass a callback
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = '28c811d7eed745f99cc4ef9276857d32';
  const [city, setCity] = useState('');

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      const jsonResponse = await response.json();
      const weatherData = {
        city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like, // Corrected key
        weather: jsonResponse.weather[0].description,
      };

      return weatherData; // Return the data on success
    } catch (error) {
      console.error('Failed to fetch weather information:', error);
      return null; // Return null on failure
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value); // Update the city based on user input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() !== '') { // Only fetch data if city input is not empty
      const weatherInfo = await getWeatherInfo();
      if (weatherInfo && onSearch) { // Call onSearch with new data
        onSearch(weatherInfo);
      }
    }
    setCity(''); // Clear the input field after search
  };

  return (
    <div className="searchBox"> {/* Fixed className case */}
      <form className="searchForm" onSubmit={handleSubmit}> {/* Updated class name */}
        <TextField
          id="cityname"
          label="City Name"
          variant="outlined"
          required
          value={city} // Bind value to 'city' state
          onChange={handleChange} // Handle input change
        />
        <br/>
        <br/>
        
        <Button   variant="contained" type="submit">Search</Button>
      <br/>
      <br/>
      </form>
       
    </div>
  );
}

