const weatherAPI = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
};

const citySearch = document.getElementById("city");
citySearch.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getWeatherData(citySearch.value);
    }
}

function getWeatherData(query) {
    const fetchRequest = `${weatherAPI.base}weather?q=${query}&units=metric&appid=${weatherAPI.key}`;
    fetch(fetchRequest)
        .then((weatherJSON) => {
            return weatherJSON.json();
        })
        .then((weatherObj) => {            
            displayResponse(weatherObj);
        })
        .catch((error) => {
            console.error("Error fetching weather data: ", error);
            let city = document.querySelector(".city-name");
            city.innerText = `Invalid City. Please Try again`;
            let date = document.querySelector(".city-date");
            date.innerText = ``;
        
            let temp = document.querySelector(".temp");
            temp.innerHTML = ``;
        
            let weather_el = document.querySelector(".weather");
            weather_el.innerText = ``;
        
            let hilow = document.querySelector(".hi-low-temp");
            hilow.innerHTML = ``;
        });
}

function displayResponse(weatherObj) {
    let city = document.querySelector(".city-name");
    city.innerText = `${weatherObj.name}, ${weatherObj.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".city-date");
    date.innerText = dateBuilder(now);

    let temperature = document.querySelector(".temp");
    temperature.innerHTML = `${Math.round(weatherObj.main.temp)}&deg;C `;

    let weatherField = document.querySelector(".weather");
    weatherField.innerText = weatherObj.weather[0].main;

    let hilow = document.querySelector(".hi-low-temp");
    hilow.innerHTML = `${Math.round(weatherObj.main.temp_min)}&deg;C / 
  ${Math.round(weatherObj.main.temp_max)}&deg;C`;
}

function dateBuilder(d) {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}