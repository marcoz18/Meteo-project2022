const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const API_KEY='bd0a2f0b34731afcfbaad0ca016953de';

setInterval(() =>{
    const time= new Date();
    const month= time.getMonth();
    const date= time.getDate();
    const day= time.getDay();
    const hour= time.getHours();
    const minutes= time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const ampm = hour >= 12 ? 'PM': 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month];
    

},1000);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        let {latitude,longitude} = success.coords;
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,minutely&appid=bd0a2f0b34731afcfbaad0ca016953de').then(response => response.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        })
    })
};
getWeatherData();