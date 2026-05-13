function showweatherDetails(event) {
    event.preventDefault();
  
    const city = document.getElementById('city').value.trim();
    const weatherInfo = document.getElementById('weatherInfo');
  
    if (!city) {
      weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
      return;
    }
  
    const apiKey = "a90edd510323d0d51b1151a92c48220d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
        return response.json();
      })
      .then(data => {
        weatherInfo.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].description}</p>
        `;
      })
      .catch(error => {
        weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  }
  
  document.getElementById('weatherForm')
    .addEventListener('submit', showweatherDetails);