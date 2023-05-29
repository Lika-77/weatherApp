let now = new Date();
let dateElement = document.querySelector("#date");

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

dateElement.innerHTML = [`${day}, ${hours}:${minutes}`];

let temperature = document.querySelector("#temperature");
temperature.textContent = 17;

function updateDescription(response) {
  let updateDescription = response.data.condition.description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${updateDescription}`;
}

function updateHumidity(response) {
  let updateHumid = Math.round(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${updateHumid} %`;
}

function updateWindSpeed(response) {
  let updateWind = Math.round(response.data.wind.speed);
  let windyElement = document.querySelector("#windy");
  windyElement.innerHTML = `${updateWind} km/h`;
}

function updateIcon(response) {
  let updateIcon = response.data.condition.icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  updateDescription(response);
  updateIcon(response);
  updateHumidity(response);
  updateWindSpeed(response);
}

function searchCity(city) {
  let apiKey = "3fa6eec140a105879e2t096ob94fbb50";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "3fa6eec140a105879e2t096ob94fbb50";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

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
