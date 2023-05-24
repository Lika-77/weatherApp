let now = new Date();
let h3 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = [`${day}, ${hours}:${minutes}`];

let temperature = document.querySelector("#temperature");
temperature.textContent = 17;

function changeFahrenheit() {
  temperature.textContent = Math.round((temperature.textContent * 9) / 5 + 32);
}
function changeCelsius() {
  temperature.textContent = Math.round(
    ((temperature.textContent - 32) * 5) / 9
  );
}

fahrenheit.addEventListener("click", changeFahrenheit);
celsius.addEventListener("click", changeCelsius);

function updatePrecipitation(response) {
  let updatePrecip = Math.round(response.data.clouds.all);
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `${updatePrecip}`;
}

function updateHumidity(response) {
  let updateHumid = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${updateHumid} %`;
}

function updateWindSpeed(response) {
  let updateWind = Math.round(response.data.wind.speed);
  let windyElement = document.querySelector("#windy");
  windyElement.innerHTML = `${updateWind} km/h`;
}

function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  updatePrecipitation(response);
  updateHumidity(response);
  updateWindSpeed(response);
}

function searchCity(city) {
  let apiKey = "6507f7c3685e33f3cd734253e01b13ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "6507f7c3685e33f3cd734253e01b13ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
