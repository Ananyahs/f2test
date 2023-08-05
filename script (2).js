const apiKey = '74cb8c6685c9d72c0f8620b6f6f4896c'; // Replace 'YOUR_API_KEY' with your actual API key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data from the API
async function getWeatherData(cityName) {
    const url = `${apiBaseUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to add a new city and create a weather card
function addCityWeatherCard(cityName) {
    // Fetch weather data for the city
    getWeatherData(cityName)
        .then(data => {
            // Create and display the weather card using the received data
      
      
      
      let maxTemp = Math.floor(data.main.temp_max);
    let minTemp = Math.floor(data.main.temp_min);
    let cityName = data.name;
    let temperature = Math.floor(data.main.temp);
    let weatherType = data.weather[0].main;
      const weatherCardTemplate = `
                <div class="weather-card">
                
                
                
                <div class="tempicon">
                <div class="humidity"><b>${temperature}°</b></div>
                    <div class="weather-icon">
                       <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
                    </div>
                 </div>
                 
                 
             <div class="lhcontainer">    
             H: ${maxTemp}&nbsp
        L: ${minTemp}
                </div> 
                 
                 <br>
                    <div class="weather-info">
                   <div class="city-name">${cityName}</div>
                    <div class="wind"> ${weatherType}</div>
                    </div>
                </div>
            `;

            const weatherCardsContainer = document.getElementById('weatherCardsContainer');
            weatherCardsContainer.insertAdjacentHTML('beforeend', weatherCardTemplate);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

const citiesArray = [];

// Set to keep track of added cities
const citiesSet = new Set();

// Object to store weather data for each city
const cityData = {};

function handleAddCity() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        // Check if the city has already been added (using Set)
        if (!citiesSet.has(cityName.toLowerCase())) {
            // Add the city to the Set and the array
            citiesSet.add(cityName.toLowerCase());
            citiesArray.push(cityName.toLowerCase());

            // Fetch weather data for the city
            getWeatherData(cityName)
                .then(data => {
                    // Store the weather data in the cityData object
                    cityData[cityName.toLowerCase()] = data;

                    // Sort the cities by temperature
                    citiesArray.sort((cityA, cityB) => {
                        const temperatureA = cityData[cityA]?.main?.temp || 0;
                        const temperatureB = cityData[cityB]?.main?.temp || 0;
                        return temperatureA - temperatureB;
                    });

                      const weatherCardsContainer = document.getElementById('weatherCardsContainer');
                    weatherCardsContainer.innerHTML = '';

                    // Create and display the weather cards for all cities in the sorted order
                    citiesArray.forEach(city => {
                        addCityWeatherCard(city);
                    });

                    // Clear the input field for the next city entry
                    cityInput.value = '';
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        } else {
            alert('City already added.');
        }
    }
}document.getElementById('addCityBtn').addEventListener('click', handleAddCity);
