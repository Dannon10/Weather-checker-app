"use strict";

const api = {
    key: "22dc920f7c5e49ca160c5de4cd87a173",
    base: "https://api.openweathermap.org/data/2.5/",
}

const search = document.querySelector(".search");
const btn = document.querySelector('.btn-submit');
btn.addEventListener('click', getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == 'click') {
        getData(search.value);
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData);
    }

function displayData(response) {
    if (response.cod === "404") {
        const error = document.querySelector('.error');
        error.textContent = 'Please enter a valid city!!';
        search.value = '';
    } else {
        const error = document.querySelector('.error');
        error.textContent = '';
        const city = document.querySelector('.city');
        city.textContent = `${response.name}, ${response.sys.country}`;

        error.classList.add("hidden");

        const today = new Date();
        const date = document.querySelector('.date');
        date.textContent = dateFunction(today);

        const weather = document.querySelector('.weather');
        weather.textContent = ` ${response.weather[0].main} `;

        const temp = document.querySelector('.temp');
        temp.textContent = `${Math.round(response.main.temp)}°C`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.textContent = ` ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const humidity = document.querySelector(".humidity");
        humidity.textContent = ` ${response.main.humidity}%`;

        const pressure = document.querySelector(".pressure");
        pressure.textContent = `${response.main.pressure}mBar`;


    }
};

function dateFunction (d) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
};
