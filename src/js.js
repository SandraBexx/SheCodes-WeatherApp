//feature 1

let currentDate = new Date();

let currentHour = currentDate.getHours();
let currentMinutes = String(currentDate.getMinutes()).padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDate.getDay()];

let currentDateAndTime = document.querySelector("#dateAndTime");
currentDateAndTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

//feature 2

let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#cityName");
  let city = `${citySearch.value}`;

  let apiKey = "be79f322990c75a1ac80877977e8bf4e";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(showTemperatureAndCity);
}

function showTemperatureAndCity(response) {
  let temperature = Math.round(response.data.main.temp);

  let searchedTemperature = document.querySelector("#currentTemperature");
  searchedTemperature.innerHTML = `${temperature}`;

  let searchedCity = document.querySelector("#currentCity");
  searchedCity.innerHTML = response.data.name;
}

//feature 3

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", showCurrentLocation);

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "be79f322990c75a1ac80877977e8bf4e";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlLocation).then(showTemperatureCurrentLocation);
  axios.get(apiUrlLocation).then(showCurrentCity);
}

function showTemperatureCurrentLocation(response) {
  let temperatureCurrentLocation = Math.round(response.data.main.temp);

  let searchedTemperatureCurrentLocation = document.querySelector(
    "#currentTemperature"
  );
  searchedTemperatureCurrentLocation.innerHTML = `${temperatureCurrentLocation}`;
}

function showCurrentCity(response) {
  let currentLocation = response.data.name;

  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${currentLocation}`;
}
