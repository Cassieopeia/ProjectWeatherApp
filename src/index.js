//Search city
let searchBar = document.querySelector("#searchCity");
searchBar.addEventListener("submit", inputCity);

function inputCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h3 = document.querySelector("h3");
  //document.querySelector("h3").innerHTML = response.data.name; // this is also an alternative
  h3.innerHTML = `${searchInput.value}`;
  presentCity(searchInput.value);
}
// Weather in requested City
function presentCity(city) {
  let units = "metric";
  let apiKey = "2716c3510b3081dc1c5d6970d11aa8eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showTemperature);

  
   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showHourly);
}

// Hourly Forecast
function showHourly(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
  
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
     <div class="col-2">
                    <h4> ${formatHours(forecast.dt * 1000)} </h4> <br />
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
                    ${Math.round(forecast.main.temp)}°C
                </div>

    `;
  }
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#bigTemperature");
  h2.innerHTML = `${temperature}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `humidity: ${humidity}%`;

  let speed = Math.round(response.data.wind.speed);
  let currentSpeed = document.querySelector("#speed");
  currentSpeed.innerHTML = `wind: ${speed} km/h`;

  let weather = response.data.weather[0].main;
  let currentWeather = document.querySelector("#weatherdis");
  currentWeather.innerHTML = `${weather}`;
  
  let iconElement = document.querySelector("#bigIcon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute ("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

// Weather local location
function setupLocal(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ed907c3cfcf52f19d3bb20fd1e0f9c16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocal);

  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showHourly);
}

function showLocal(response) {
  let temperature = Math.round(response.data.main.temp);
  let localTemp = document.querySelector("#bigTemperature");
  localTemp.innerHTML = `${temperature}`;

  let humidity = response.data.main.humidity;
  let localHumidity = document.querySelector("#humidity");
  localHumidity.innerHTML = `humidity: ${humidity}%`;

  let speed = Math.round(response.data.wind.speed);
  let localSpeed = document.querySelector("#speed");
  localSpeed.innerHTML = `wind: ${speed} km/h`;

  let weather = response.data.weather[0].main;
  let localWeather = document.querySelector("#weatherdis");
  localWeather.innerHTML = `${weather}`;

  let localCity = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = localCity;

  celsiusTemperature = response.data.main.temp;
}
//Local Button
function getLocal(response) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(setupLocal);
}
let localButton = document.querySelector(".fas.fa-map-marker-alt");
localButton.addEventListener("click", getLocal);

// Day and Time
let timeNow = new Date();

let h1 = document.querySelector("h1");
let date = timeNow.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[timeNow.getDay()];
let hours = timeNow.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = timeNow.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h1.innerHTML = `${day} ${hours}:${minutes}`;



// Hourly time format
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// Celcius and Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#bigTemperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#bigTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

presentCity("Oostende");