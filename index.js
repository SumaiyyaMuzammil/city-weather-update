const apikey = "01d9f2d66b5fb9c863aa86b5cb001cd2";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];




    

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}



// const apikey = "01d9f2d66b5fb9c863aa86b5cb001cd2";
// const weatherDataEl = document.getElementById("weather-data");
// const cityInputEl = document.getElementById("city-input");
// const formEl = document.querySelector("form");

// formEl.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const cityValue = cityInputEl.value.trim();
//   if (cityValue) {
//     getWeatherData(cityValue);
//   }
// });

// async function getWeatherData(cityValue) {
//   // Clear previous data
//   weatherDataEl.querySelector(".icon").innerHTML = "";
//   weatherDataEl.querySelector(".temperature").textContent = "";
//   weatherDataEl.querySelector(".description").textContent = "";
//   weatherDataEl.querySelector(".details").innerHTML = "";

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
//     );

//     if (!response.ok) {
//       if (response.status === 404) {
//         throw new Error("City not found");
//       } else if (response.status === 401) {
//         throw new Error("Invalid API key");
//       } else if (response.status === 429) {
//         throw new Error("Rate limit exceeded, please try again later");
//       } else {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
//     }

//     const data = await response.json();
//     const temperature = Math.round(data.main.temp);
//     const description = data.weather[0].description;
//     const icon = data.weather[0].icon;
//     const details = [
//       `Feels like: ${Math.round(data.main.feels_like)}°C`,
//       `Humidity: ${data.main.humidity}%`,
//       `Wind speed: ${data.wind.speed} m/s`,
//     ];

//     weatherDataEl.querySelector(
//       ".icon"
//     ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
//     weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
//     weatherDataEl.querySelector(".description").textContent = description;
//     weatherDataEl.querySelector(".details").innerHTML = details
//       .map((detail) => `<div>${detail}</div>`)
//       .join("");
//   } catch (error) {
//     weatherDataEl.querySelector(".description").textContent =
//       error.message || "An error happened, please try again later";
//     weatherDataEl.querySelector(".details").innerHTML = "";
//     console.error("Error fetching weather data:", error);
//   }
// }
