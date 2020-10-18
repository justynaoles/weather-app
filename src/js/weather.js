import {countryList} from './countryList';
import {weatherCodeList} from './weatherCodeList';

const container = document.querySelector('.container');
const weather = document.querySelector('.weather');
let city = 'London';
const appId = '8c654c21b7cb72da0bd479fc3d3a7540';
const searchCityBtn = document.querySelector('.js--searchCity');
const inputCity = document.querySelector('.js--cityName');
const cityTemp = document.querySelector('.js--cityTemp');
const cityTempFeels = document.querySelector('.js--tempFeelsLike');
const cityWindSpeed = document.querySelector('.js--cityWindSpeed');
const cityHumidity = document.querySelector('.js--cityHumidity');
const kelvin = 273.15;
const nextDaysList = [...document.querySelectorAll('.item__title--day')];
const nextDaysListTemp = [...document.querySelectorAll('.item__title--temp')];
const nextDaysListIcons= [...document.querySelectorAll('.item__title--icon')];
const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const tempsArray = [3,6,2];
const tempsNextDaysIconsArray = [];
const currentDate = new Date();
const currentDay = currentDate.getDay();
let tempUnit = 'celsius';
let bgImagesArray;
const body = document.body;

nextDaysList.map((day,index) => day.innerText = daysArray[index]);
nextDaysListTemp.map((temp,index) => temp.innerText = tempsArray[index]);

const cityCountryName = document.querySelector('.js--cityCountryName');


export class WeatherApp {

  constructor(city) {
    this.city = city;
  }

  getWeatherData(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8c654c21b7cb72da0bd479fc3d3a7540`)
    .then(response => response.json())
    .then(data => {
     this.city = data.name;
     
     if(this.city) {
      this.placeWeatherData(data);
      this.setCityCountryName(data);
      cityTemp.textContent = this.calculateTempUnits(data.main.temp, tempUnit);

      this.setWeatherDataNextDays(this.city);
      this.getWeatherCode(this.city);
     } else {
       alert('ups, coś poszło nie tak...');
     }
    });
  };

  setWeatherDataNextDays(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8c654c21b7cb72da0bd479fc3d3a7540`)
    .then(response => response.json())
    .then(data => {
      const tempsList = data.list;

      tempsNextDaysIconsArray.length = 0;
      tempsList.length = 4;
      tempsList.pop();
      tempsArray.length = 0;
      for (let i = 0; i<tempsList.length; i++) {
       tempsArray.push(this.calculateTempUnits(tempsList[i].main.temp,this.tempUnit));
       tempsNextDaysIconsArray.push(tempsList[i].weather[0].icon);
      };

      nextDaysListIcons.map((icon,index) => icon.src=`http://openweathermap.org/img/wn/${tempsNextDaysIconsArray[index]}@2x.png`)
      nextDaysListTemp.map((temp,index) => temp.innerText = tempsArray[index]);

    })
  }

  placeWeatherData(data) {

   cityHumidity.textContent = `${data.main.humidity}%`;
   cityWindSpeed.textContent = `${data.wind.speed} m/s`;
   cityTempFeels.textContent = this.calculateTempUnits(data.main['feels_like'], tempUnit);
    
  };

  getCityName(inputName){

    const inputData = inputName.value;
    
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

  getWeatherCode(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8c654c21b7cb72da0bd479fc3d3a7540`)
    .then(response => response.json())
    .then(data => {
     this.city = data.name;
     
     if(this.city) {
        return this.setWeatherAppBg(data.cod);
     } else {
       alert('ups, coś poszło nie tak...');
     }
    });
  }

  setWeatherAppBg(code) {
    const weatherCode = code.toString().charAt(0);

    let pictureType;

    switch (weatherCode) {
      case '2':
        pictureType = 'thunderstorm';
        break;
      case '3':
        pictureType = 'drizzle';
        break;
      case '5':
        pictureType = 'rain';
        break;
      case '6':
        pictureType = 'snow';
        break;
      case '7':
        pictureType = 'atmosphere';
        break;
      case '8':
        pictureType = 'clear';
        break;
      default:
        pictureType = 'random';
    }

    return pictureType;
  }
};

const weatherApp = new WeatherApp();

searchCityBtn.addEventListener('click', function(){
  weatherApp.getCityName(inputCity);
});

weatherApp.getWeatherData('Kraków');


