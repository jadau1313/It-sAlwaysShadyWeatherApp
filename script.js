
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
document.getElementById("add-favorite").addEventListener('click', async ()=>{
    const city = document.getElementById("city-search").value; //city from input
    const apiKey = '6444e41eb1b209fb5ef2bab9e042dbf7';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data && data.location && data.current){
            const cityName = data.location.name;
            const regionName = data.location.region;
            const isDuplicate = favs.some(fav => fav.city === cityName && fav.region === regionName);
            //favs.push({city, region});
            if(cityName && regionName && !isDuplicate && favs.length<maxFavs){
                favs.push({city: cityName, region: regionName});
                updateFavoritesDisplay();
            }else if(isDuplicate){
                alert(`${cityName}, ${regionName} is already in your favorites!`);
            }else if(favs.length>=maxFavs){
                alert(`You can have up to ${maxFavs} favorite cities!`);
            }

        }
    }catch(error){
        alert('Error adding to favorites!');
    }
    
    /*if(city && !favs.includes(city) && favs.length<maxFavs){
        favs.push(city);
        updateFavoritesDisplay();
    }else if(favs.includes(city)){
        alert(`${city} is already in your favorites!`);
    }else if(favs.length>=maxFavs){
        alert(`You can have up to ${maxFavs} favorite cities!`);
    }*/

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
            const tempC = data.current.temperature;
            const tempF = (tempC * 9/5) + 32;
            const{ name, region } = data.location;
            const{ temperature, weather_descriptions} = data.current;
            document.getElementById('weather-info').innerHTML = 
                `<h2>${name}, ${region}</h2>
                <p>Temperature: ${temperature}°C / ${tempF.toFixed(1)}°F</p>
                <p>Conditions: ${weather_descriptions[0]}</p>
            `;
            //document.getElementById("weather-city").textContent = `${name}, ${region}`;
        }
    }catch(error){
        alert('Error fetching weather data!');
    }
    
}


function displayWeatherData(data) {
    const tempC = data.current.temperature;
    const tempF = (tempC * 9/5) + 32;
    document.getElementById('weather-city').textContent = `Weather in ${data.location.name}`; // City name
    document.getElementById('weather-description').textContent = `Condition: ${data.current.weather_descriptions[0]}`; // Weather condition
    document.getElementById('weather-temperature').textContent = 
    `Temperature: ${data.current.temperature}°C / (${tempF.toFixed(1)}°F)`; // Temperature in Celsius --not showing up yet
}


function updateFavoritesDisplay(){
    const favsList = document.getElementById('favorites-list');
    favsList.innerHTML = ''; //clear current list

    favs.forEach(fav=>{

        const listItem = document.createElement('li');
        listItem.textContent = `${fav.city}, ${fav.region}`;
        favsList.appendChild(listItem);
    });
}