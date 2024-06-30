const apiKey = 'fcc8de7015bbb202209bbf0261babf4c'; // Replace with your API key
const searchBox = document.querySelector('.search-box');
const cityElement = document.querySelector('.city');
const dateElement = document.querySelector('.date');
const tempElement = document.querySelector('.temp');
const weatherElement = document.querySelector('.weather');
const hiLowElement = document.querySelector('.hi-low');

// Event listener for when user presses Enter in the search box
searchBox.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    getWeather(searchBox.value);
    searchBox.value = ''; // Clear the input after searching
  }
});

// Function to fetch weather data from API
function getWeather(query) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    });
}

// Function to display weather data
function displayWeather(data) {
  cityElement.textContent = `${data.name}, ${data.sys.country}`;
  const currentDate = new Date();
  dateElement.textContent = dateBuilder(currentDate);
  tempElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
  weatherElement.textContent = data.weather[0].description;
  hiLowElement.textContent = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;
}

// Function to format date
function dateBuilder(d) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
