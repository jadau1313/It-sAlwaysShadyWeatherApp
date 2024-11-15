
const maxFavs = 5;
let favs = [];

//adds event listener to search bar
document.getElementById("search-button").addEventListener('click', ()=>{
    const city = document.getElementById('city-search').value; //city from input
    if(city){
        fetchWeatherData(city);
    }

});

//event listener for add to favorites
document.getElementById("add-favorite").addEventListener('click', ()=>{
    const city = document.getElementById('city-search').value; //city from input
    if(city && !favs.includes(city) && favs.length<maxFavs){
        favs.push(city);
        updateFavoritesDisplay();
    }else if(favs.includes(city)){
        alert(`${city} is already in your favorites!`);
    }else if(favs.length>=maxFavs){
        alert(`You can have up to ${maxFavs} favorite cities!`);
    }

});
/*
//fetch and check weather data before it can be displayed from weatherstack using api key
async function fetchWeatherData(city) {
    const apiKey = '6444e41eb1b209fb5ef2bab9e042dbf7';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try{
        const response = await fetch(url); //fetch data from api
        const data = await response.json();//parse response as json

        if(data.error){
            alert("Error: "+data.error.info);
        }else{
            displayWeatherData(data);
        }
    }catch(error){
        console.error('Error fetching weather data:', error); // Log any network errors
        alert('An error occurred while fetching weather data.');
    }
    
}*/

async function fetchWeatherData(city){
    const apiKey = '6444e41eb1b209fb5ef2bab9e042dbf7';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data && data.location && data.current){
            const{ name, region } = data.location;
            const{ temperature, weather_descriptions} = data.current;
            document.getElementById('weather-info').innerHTML = `
                <h2>${name}, ${region}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Conditions: ${weather_descriptions[0]}</p>
            `;
        }
    }catch(error){
        alert('Error fetching weather data!');
    }
    
}


function displayWeatherData(data) {
    document.getElementById('weather-city').textContent = `Weather in ${data.location.name}`; // City name
    document.getElementById('weather-description').textContent = `Condition: ${data.current.weather_descriptions[0]}`; // Weather condition
    document.getElementById('weather-temperature').textContent = `Temperature: ${data.current.temperature}°C`; // Temperature in Celsius
}


function updateFavoritesDisplay(){
    const favsList = document.getElementById('favorites-list');
    favsList.innerHTML = ''; //clear current list

    favs.forEach(city=>{
        const listItem = document.createElement('li');
        listItem.textContent = city;
        favsList.appendChild(listItem);
    });
}