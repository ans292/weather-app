function formatDate(timestamp) {
  let now = new Date();

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
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  let name = response.data.name;
  console.log(temperature);
  let weather = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  console.log(wind);
  let localTemp = document.querySelector("#temperature");
  let localName = document.querySelector("#city-name");
  let localWeather = document.querySelector("#weather");
  let localHumidity = document.querySelector("#humidity");
  let localWind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date-time");

  celsiusTemperature = response.data.main.temp;

  localTemp.innerHTML = temperature;
  localName.innerHTML = name;
  localWeather.innerHTML = weather;
  localHumidity.innerHTML = humidity;
  localWind.innerHTML = wind;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  celsiusTemp.classList.remove("active");
  farenheitTemp.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let localTemp = document.querySelector("#temperature");
  localTemp.innerHTML = Math.round(farenheitTemperature);
}
let farenheitTemp = document.querySelector("#farenheit-link");
farenheitTemp.addEventListener("click", farenheitCalculation);

function celsiusCalculation(event) {
  event.preventDefault();

  farenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  let localTemp = document.querySelector("#temperature");
  localTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", celsiusCalculation);
