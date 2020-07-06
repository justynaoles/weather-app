

const weather = document.querySelector('.weather');
const city = 'London';
const appId = '8c654c21b7cb72da0bd479fc3d3a7540';

class WeatherApp {

  constructor(city) {
    this.city = city;
  }

  getWeatherData(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8c654c21b7cb72da0bd479fc3d3a7540`)
    .then(response => response.json())
    .then(data => {
     this.city = data.name;
     this.placeWeatherData(data);
    });
  }

  placeWeatherData(data) {
    console.log('city name', data.name);
    console.log('humidity', data.main.humidity);
  };

  getCityName(inputName){

    const inputData = inputName.value;
    console.log(inputData);
    
    return this.getWeatherData(inputData);
  }
};

const weatherApp = new WeatherApp();
const searchCityBtn = document.querySelector('.js--searchCity');
const inputCity = document.querySelector('.js--cityName');


searchCityBtn.addEventListener('click', function(){
  weatherApp.getCityName(inputCity);
});


weather.addEventListener('click', function(){
  weatherApp.getWeatherData(city);
});