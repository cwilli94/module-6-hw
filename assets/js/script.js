// const fiveDay = document.getElementsById('fiveday');
// const searchBtn = document.getElementById('searchBtn');
// const cityName = document.getElementById('input');
// const todaysForecast = document.getElementById('todaysForecast');
// const history = document.getElementById('history');

// //get lat and lon
// async function getCoords(cityName, stateCode, countryCode, limit) {
//     let apiKey = '8269b9eae5d821ab324b7e685d141133';
//     let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;
  
//     try {
//       const response = await fetch(requestUrl);
//       const data = await response.json();
  
//       if (data.length > 0) {
//         const { lat, lon } = data[0];
//         return { lat, lon };
//       } else {
//         throw new Error('No coordinates found for the specified location.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   }
  
  

// //get weather
// function getWeather(latitude, longitude) {
//     let apiKey = '8269b9eae5d821ab324b7e685d141133';
//     let latitude = lat;
//     let longitude = lon;
//     let requestUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
//   }
const fiveDay = document.getElementById('fiveday');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('input');
const todaysForecast = document.getElementById('todaysForecast');
const searchHistory = document.getElementById('history');

// Function to get weather forecast for today
async function getWeather(city) {
  let apiKey = '8269b9eae5d821ab324b7e685d141133'; // Replace with your actual API key
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(requestUrl);
    const data = await response.json();

    if (data.list.length > 0) {
      const todayWeather = data.list[0].weather[0].description;
      const todayTemperature = convertToFahrenheit(data.list[0].main.temp);
      const forecastData = data.list.slice(1, 6).map((item) => ({
        description: item.weather[0].description,
        temperature: convertToFahrenheit(item.main.temp)
      }));
      return { todayWeather, todayTemperature, forecastData };
    } else {
      throw new Error('Unable to fetch weather data.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Function to convert temperature from Kelvin to Fahrenheit
function convertToFahrenheit(temp) {
  return ((temp - 273.15) * 9) / 5 + 32;
}

// Function to save searched city in local storage
function saveCity(city) {
  const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
  if (!searchedCities.includes(city)) {
    searchedCities.push(city);
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
  }
}

// Function to retrieve weather for a saved city
async function retrieveWeather(city) {
  const { todayWeather, todayTemperature, forecastData } = await getWeather(city);

  if (todayWeather && todayTemperature) {
    todaysForecast.innerHTML = `
      <div>Today's Forecast: ${todayWeather}</div>
      <div>Temperature: ${todayTemperature.toFixed(2)}°F</div>
    `;
  }

  fiveDay.innerHTML = '';
  forecastData.forEach((forecast) => {
    const dayDiv = document.createElement('div');
    const descriptionDiv = document.createElement('div');
    const temperatureDiv = document.createElement('div');

    descriptionDiv.textContent = `Description: ${forecast.description}`;
    temperatureDiv.textContent = `Temperature: ${forecast.temperature.toFixed(2)}°F`;

    dayDiv.appendChild(descriptionDiv);
    dayDiv.appendChild(temperatureDiv);

    fiveDay.appendChild(dayDiv);
  });
}

// Event listener for search button click
searchBtn.addEventListener('click', async () => {
  const city = cityName.value;
  await retrieveWeather(city);
  saveCity(city);
  appendSearchedCities();
});

// Function to append searched cities as buttons
function appendSearchedCities() {
  const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
  searchHistory.innerHTML = '';

  searchedCities.forEach((city) => {
    const button = document.createElement('button');
    button.textContent = city;
    button.addEventListener('click', () => {
      retrieveWeather(city);
    });

    searchHistory.appendChild(button);
  });
}
