

const weather = document.querySelector('.weather');
const city = 'London';
const appId = '8c654c21b7cb72da0bd479fc3d3a7540';

weather.addEventListener('click',function(){
    console.log('heluu');

    fetch('http://api.openweathermap.org/data/2.5/weather?q=Makarska&APPID=8c654c21b7cb72da0bd479fc3d3a7540')
  .then(response => response.json())
  .then(data => console.log(data));
})


