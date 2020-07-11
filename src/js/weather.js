import {countryList} from './countryList';

const weather = document.querySelector('.weather');
const city = 'London';
const appId = '8c654c21b7cb72da0bd479fc3d3a7540';
const searchCityBtn = document.querySelector('.js--searchCity');
const inputCity = document.querySelector('.js--cityName');
const cityTemp = document.querySelector('.js--cityTemp');
const cityTempFeels = document.querySelector('.js--tempFeelsLike');
const cityWindSpeed = document.querySelector('.js--cityWindSpeed');
const cityHumidity = document.querySelector('.js--cityHumidity');
const kelvin = 273.15;
let tempUnit = 'celsius';

const cityCountryName = document.querySelector('.js--cityCountryName');


class WeatherApp {

  constructor(city) {
    this.city = city;
  }

  getWeatherData(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8c654c21b7cb72da0bd479fc3d3a7540`)
    .then(response => response.json())
    .then(data => {
     this.city = data.name;
     
     if(this.city) {
      this.placeWeatherData(data);
      this.setCityCountryName(data);
      cityTemp.textContent = this.calculateTempUnits(data.main.temp, tempUnit);
     } else {
       alert('ups, coś poszło nie tak...');
     }
    });
  }

  placeWeatherData(data) {

   cityHumidity.textContent = `${data.main.humidity}%`;
   cityWindSpeed.textContent = `${data.wind.speed} m/s`;
   cityTempFeels.textContent = this.calculateTempUnits(data.main['feels_like'], tempUnit);
    
  };

  getCityName(inputName){

    const inputData = inputName.value;
    console.log(inputData);
    
    return this.getWeatherData(inputData);
  }

  setCityCountryName(data) {
    const city = data.name;
    const countryCode = data.sys.country;
    const country = countryList[countryCode];
    return cityCountryName.textContent = `${city}, ${country}`;
  }

  setCityTimeDate(data) {
    const date = new Date();
  }

  calculateTempUnits(temp, unit) {
    if(unit = 'celsius') {
      return Math.floor(temp - kelvin);
    } else {
      return Math.floor(kelvin * (9/5) - 459.67);
    }
  }
};

const weatherApp = new WeatherApp();

searchCityBtn.addEventListener('click', function(){
  weatherApp.getCityName(inputCity);
});


weather.addEventListener('click', function(){
  weatherApp.getWeatherData(city);
});