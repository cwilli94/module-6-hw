const fiveDay = document.getElementsByClassName();
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('input');

//get lat and lon
async function getCoords(cityName, stateCode, countryCode, limit) {
    let apiKey = '12cc8b01bee3c16cf3c2a1c036d6e9fa';
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;
  
    try {
      const response = await fetch(requestUrl);
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat, lon };
      } else {
        throw new Error('No coordinates found for the specified location.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  

//get weather
function getWeather(latitude, longitude) {
    let apiKey = '12cc8b01bee3c16cf3c2a1c036d6e9fa';
    let latitude = lat;
    let longitude = lon;
    let requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
  }
  