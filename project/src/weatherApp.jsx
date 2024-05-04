import React, { useState } from 'react'; // Consistent import structure
import InfoBox from './infoBox'; // Capitalization consistency
import SearchBox from './searchbox'; // Capitalization consistency

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: 'DREAMLAND', // Default initial data
    feelslike: 24.48,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: 'haze',
  });

  const updateWeatherInfo = (newInfo) => { // Use clear, descriptive names
    setWeatherInfo(newInfo); // Update the state with new weather info
  };

  return (
    
    <div style={{ textAlign: 'center', position:"relative"  }}> {/* Center-align all content */}

     <br/>
      <h2>Weather App</h2> 
      <SearchBox onSearch={updateWeatherInfo} />  
      <InfoBox info={weatherInfo} /> {/* Pass current weather info */}
    
    </div>
  );
}
