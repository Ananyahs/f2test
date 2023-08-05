let currentCardsArr = [];

let searchBtn = document.querySelector(".container__add-city-btn button");
searchBtn.addEventListener("click", () => {
    let apiKey = "0d37d999b4705308cc960c47e35d754d"
    let inputCityName = document.querySelector(".container__search-input input");
    getWeatherDetails(apiKey, inputCityName.value.toLocaleLowerCase());
    inputCityName.value = "";
})


let error = document.querySelector(".error-message");
async function getWeatherDetails(apiKey, cityName) {
    try{
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    let response = await fetch(Url);
    let data = await response.json();
    createCard(data);
    error.style.display = "none";
    }catch (data) {
        error.style.display = "block";
    }
}

let cardsContainer = document.querySelector(".container__weather-cards");
let weatherImg = document.querySelector(".weather-img img")
function createCard(cityData) {
    let maxTemp = Math.floor(cityData.main.temp_max);
    let minTemp = Math.floor(cityData.main.temp_min);
    let cityName = cityData.name;
    let temperature = Math.floor(cityData.main.temp);
    let weatherType = cityData.weather[0].main;
    let weatherImgString;
    if (cityData.weather[0].main == "Clouds") 
    {
        weatherImgString = "./assets/Cloudy.png";
        
    } 
    if(cityData.weather[0].main == "Clear") 
    {
        weatherImgString = "./assets/Cloudy.png";
    } 
    if(cityData.weather[0].main == "Haze") 
    {
        weatherImgString = "./assets/windy.png";
    } 
    if(cityData.weather[0].main == "Rain") 
    {
        weatherImgString = "./assets/Rainy.png";
    } 
    if(cityData.weather[0].main == "Drizzle") 
    {
        weatherImgString = "./assets/tornado.png";
    } 
    if (cityData.weather[0].main == "Mist") 
    {
        weatherImgString = "./assets/windy.png";
    }

    let CardDiv = document.createElement("div");
    CardDiv.classList.add("single-card");
    CardDiv.classList.add("animate__animated", "animate__fadeIn");
    let cardHtml = `<div class="background-svg">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="343"
                        height="175"
                        viewBox="0 0 343 175"
                        fill="none"
                        >
                        <path
                            d="M0.42749 66.4396C0.42749 31.6455 0.42749 14.2484 11.7535 5.24044C23.0794 -3.76754 40.0301 0.147978 73.9315 7.97901L308.33 62.1238C324.686 65.9018 332.864 67.7909 337.646 73.8031C342.427 79.8154 342.427 88.2086 342.427 104.995V131C342.427 151.742 342.427 162.113 335.984 168.556C329.54 175 319.169 175 298.427 175H44.4275C23.6857 175 13.3148 175 6.87114 168.556C0.42749 162.113 0.42749 151.742 0.42749 131V66.4396Z"
                            fill="url(#paint0_linear_642_26)"
                        />
                        <defs>
                            <linearGradient
                            id="paint0_linear_642_26"
                            x1="0.42749"
                            y1="128"
                            x2="354.57"
                            y2="128"
                            gradientUnits="userSpaceOnUse"
                            >
                            <stop stop-color="#5936B4" />
                            <stop offset="1" stop-color="#362A84" />
                            </linearGradient>
                        </defs>
                        </svg>
                    </div>
                    <div class="single-card-top">
                        <div class="temp">${temperature}°</div>
                        <div class="weather-img">
                        <img src="${weatherImgString}" alt="cloudy" />
                        </div>
                    </div>
                    <div class="single-card-bottom">
                        <div class="card-bottom-left">
                        <div class="atmospheric-pressure">
                            <div class="atm-pre-high">H:${maxTemp}</div>
                            <div class="atm-pre-low">L:${minTemp}</div>
                        </div>
                        <div class="city-name">${cityName}</div>
                        </div>
                        <div class="card-bottom-right">${weatherType}</div>
                    </div>`
             CardDiv.innerHTML = cardHtml;
             currentCardsArr.push({temperature,CardDiv}); 
             appendUi(currentCardsArr);  
}

function appendUi(currentCardsArr) {
    cardsContainer.innerHTML = "";
    currentCardsArr.sort((a,b) => a.temperature - b.temperature);
    currentCardsArr.forEach((card) => {
        cardsContainer.appendChild(card.CardDiv);
    })
}
