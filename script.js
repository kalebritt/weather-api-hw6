//console log "hello" to ensure js is connected to html
console.log("hello");

//create variables
var weatherApi =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&units=imperial&appid={8d711c11700284f25c465cc9cf75be69}";

var apiKey = "8d711c11700284f25c465cc9cf75be69";

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=atlanta&limit=1&appid=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data[0].lat);
    console.log(data[0].lon);
    fetchCurrentWeather(data[0].lat, data[0].lon);
    fetchForecast(data[0].lat, data[0].lon);
  });

function fetchCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function fetchForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
