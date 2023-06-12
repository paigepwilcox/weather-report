const state = {
    city: 'Honolulu',
    lat: 21.3099,
    long: 157.8581,
    temp: 72,
};

const findLatitudeAndLongitude = () => {
    let latitude, longitude;
    let location = state.city;
    axios.get('http://localhost:5000/location',
    {
        params: {
            q: location,
        },
    })
    .then( (response) => {
        console.log(response);
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        console.log(`response: ${state.city}`);
        console.log('success in findLatitudeAndLongitude!', latitude, longitude);
        
        // make the next API call here!
        //   findLocation(latitude, longitude);
    })
    .catch( (error) => {
    console.log(`error: ${state.city}`);
    console.log('error in findLatitudeAndLongitude!');
    console.log(error);
});
}


// const convertKtoF = (temp) => {
//     return (temp - 273.15) * (9 / 5) + 32;
//   };
  
//   const findLatAndLong = () => {
//     axios
//       .get('http://localhost:5000/location', {
//         params: {
//           q: state.city,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         state.lat = response.data[0].lat;
//         console.log(state.lat);
//         state.long = response.data[0].lon;
//         getWeather();
//       })
//       .catch((error) => {
//         console.log('Error finding the latitude and longitude:', error.response);
//       });
//   };
  
//   const getWeather = () => {
//     axios
//       .get('http://localhost:5000/weather', {
//         params: {
//           lat: state.lat,
//           lon: state.long,
//         },
//       })
//       .then((response) => {
//         const weather = response.data;
//         state.temp = Math.round(convertKtoF(weather.main.temp));
//         formatTempAndGarden();
//       })
//       .catch((error) => {
//         console.log('Error getting the weather:', error);
//       });
//   };



// --------------------------------------------------------------------------------------

const updateSky = () => {
    let sky = document.getElementById('sky');
    let skyOption = document.getElementById('sky-select').value;
    if (skyOption === 'Sunny') {
        sky.textContent = "☁️☁️✨🌚☁️🌝☁️✨☁️";
    } else if (skyOption === 'Cloudy') {
        sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (skyOption === 'Rainy') {
        sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else if (skyOption === 'Snowy') {
        sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
};

const formatTempAndGarden = () => {
    let temp = state.temp;
    let color = 'blue';
    let landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";

    if (temp >= 80) {
        color = 'red';
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temp >= 70) {
        color = 'orange';
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temp >= 60) {
        color = 'yellow';
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (temp >= 50) {
        color = 'green';
    } else {
        color = 'blue';
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }

    const temperature = document.getElementById('temp');
    temperature.textContent = String(state.temp);
    temperature.className = color;
    temperature.style.color = color;
    const garden = document.getElementById('garden');
    garden.textContent = landscape;
};

const incrementTemp = () => {
    state.temp += 1;
    formatTempAndGarden();
};

const decrementTemp = () => {
    state.temp -= 1;
    formatTempAndGarden();
};

const updateCityName = () => {
    const inputName = document.getElementById('city-name-input').value;
    const headerName = document.getElementById('header-city-name');
    state.city = inputName;
    headerName.textContent = state.city;
}

const registerEventHandlers = () => {
    formatTempAndGarden();
    findLatitudeAndLongitude();
    // findLatAndLong();
    
    const increaseTempButton = document.getElementById('up-arrow');
    increaseTempButton.addEventListener("click", incrementTemp);
    
    const decreaseTempButton = document.getElementById('down-arrow');
    decreaseTempButton.addEventListener("click", decrementTemp);

    const cityNameInput = document.getElementById('city-name-input');
    cityNameInput.addEventListener("input", updateCityName);

    // const  getRealTimeTemperatureBtn = document.getElementById('realtime-temp-button');
    // getRealTimeTemperatureBtn.addEventListener("click", findLatAndLong);
    const  getRealTimeTemperatureBtn = document.getElementById('realtime-temp-button');
    getRealTimeTemperatureBtn.addEventListener("click", findLatitudeAndLongitude);

    const selectSkyOption = document.getElementById('sky-select');
    selectSkyOption.addEventListener("change", updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);