//console log "hello" to ensure js is connected to html
console.log("hello");

//create variables
var weatherApi =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&units=imperial&appid={8d711c11700284f25c465cc9cf75be69}";

var apiKey = "8d711c11700284f25c465cc9cf75be69";
var form = document.getElementById("search-bar");
var currentWeatherEl = document.querySelector(".current-weather");
var forecastWeatherEl = document.querySelector(".forecast");

//action when 'submitted'
form.addEventListener("submit", function (event) {
  event.preventDefault();
  getCoordinates(event.target.children[0].value);
});

//create functions for 'fetch'
function getCoordinates(cityName) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      fetchCurrentWeather(data[0].lat, data[0].lon, data[0].name);
      fetchForecast(data[0].lat, data[0].lon);
    });
}
function fetchCurrentWeather(lat, lon, name) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderCurrentWeather(data, name);
      renderForecast(data);
    });
}

// function fetchForecast(lat, lon) {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       //for loop to change where to begin in array and where to jump in array
//       for (let i = 6; i < data.list.length; i += 8) {
//         console.log(data.list[i]);
//         //   var el = getElementById("#city-list");
//         //   el.text = data.list[i];
//         //   el.value = data.list[i];

//         //   select.add(el);
//       }
//     });
// }

function renderCurrentWeather(data, name) {
  console.log(data);
  currentWeatherEl.innerHTML = `
  <div>
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"/>
  </div>
  <div>
  <p>Temperature: ${data.current.temp}</p>
    <p>Humidity: ${data.current.humidity}</p>
    <p>Wind: ${data.current.wind_speed}</p>
    <p>UV Index: ${data.current.uvi}</p>
  </div>
  
  `;
}

function renderForecast(data) {
  forecastWeatherEl.innerHTML = "";
  for (let index = 0; index < 5; index++) {
    const element = data.daily[index];
    console.log(element);
    var card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="card-header">
      <h5>${new Date(element.dt * 1000).toLocaleString("en-US", {
        weekday: "long",
      })}</h5>
    </div>
    <div class="card-body">
    <img src="https://openweathermap.org/img/wn/${
      element.weather[0].icon
    }@2x.png"/>
        <p class="card-text">Temperature: ${element.temp.day}</p>
        <p class="card-text">Wind Speed: ${element.wind_speed}</p>
        <p class="card-text">Humidity: ${element.humidity}</p>
        <p class="card-text">UV Index: ${element.uvi}</p>
    </div>
    `;
    forecastWeatherEl.append(card);
  }
}
// localStorage.setItem(JSON.stringify(data));
