let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let formattedDate = document.querySelector("#date-time");
let today = `${day}, ${hours}:${minutes}`;
formattedDate.innerHTML = today;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  let name = response.data.name;
  console.log(temperature);
  let weather = response.data.weather[0].description;
  let localTemp = document.querySelector("#temperature");
  let localName = document.querySelector("#city-name");
  let localWeather = document.querySelector("#weather");
  localTemp.innerHTML = temperature;
  localName.innerHTML = name;
  localWeather.innerHTML = weather;
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let currentCity = city.value;
  let apiKey = "2788427c942749bbb1b2d649ace67361";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentCityInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

function getCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2788427c942749bbb1b2d649ace67361";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentCityInfo);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCity);

function farenheitCalculation(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  //temp.innerHTML = 102;
}
let farenheitTemp = document.querySelector("#farenheit-link");
farenheitTemp.addEventListener("click", farenheitCalculation);

function celsiusCalculation(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  //temp.innerHTML = 39;
}
let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", celsiusCalculation);
