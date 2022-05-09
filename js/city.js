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

async function requestImage() {
    let response = await fetch("https://api.unsplash.com/search/photos?query=newyork&client_id=SFaop7iI_KIr1o7FDwHDnQjOdOKhX6JPJ8nVZB9q-98",{method:"GET"});
    let jsonObj = await response.json();
    document.body.style.backgroundImage = "url("+jsonObj.results[0].urls.raw+")";
}

document.addEventListener('DOMContentLoaded',() => {
    requestImage();
})

setInterval(() =>{
    const time= new Date();
    const month= time.getMonth();
    const date= time.getDate();
    const day= time.getDay();
    const hour= time.getHours();
    const minutes= time.getMinutes();

    timeEl.innerHTML = (hour < 10? '0'+hour : hour) + ':' + (minutes < 10? '0'+minutes: minutes);
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month];
    

},1000);

function showWeatherData(data){
    let {humidity,temp,sunrise,sunset,wind_speed}= data.current;
    fetch('https://api.mymemory.translated.net/get?q='+data.timezone+'&langpair=en|it').then(response => response.json()).then(data => {   
        timezone.innerHTML = data.matches[0].translation;
    })
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E';

    currentWeatherItemsEl.innerHTML=
    `<div class="weather-item">
        <div>Temperatura</div>
        <div>${Math.round(temp)}°C</div>
    </div>
    <div class="weather-item">
        <div>Umidità</div>
        <div>${humidity} %</div>
    </div>
    <div class="weather-item">
        <div>Vento</div>
        <div>${wind_speed} km/h</div>
    </div>
    <div class="weather-item">
        <div>Alba</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm')}</div>
    </div>
    <div class="weather-item">
        <div>Tramonto</div>
        <div>${window.moment(sunset*1000).format('HH:mm')}</div>
    </div>
    
    `;

let otherDayForecast = ''

data.daily.forEach((day, idx) => {
    moment.locale("it");
    var giorno = moment(day.dt*1000);
    console.log (giorno.format('dddd'));
    if(idx == 0){
        currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">Oggi</div>
            <div class="temp"> ${day.weather[0].description.charAt(0).toUpperCase()+day.weather[0].description.slice(1)}</div>
            <div class="temp">Giorno - ${day.temp.day} °C</div>
            <div class="temp">Notte - ${day.temp.night} °C</div>
        </div>
        
        `;
    }else{
        otherDayForecast += `
        <div class="weather-forecast-item">
            <div class="day">${giorno.format('ll')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp"> ${day.weather[0].description.charAt(0).toUpperCase()+day.weather[0].description.slice(1)}</div>
            <div class="temp">Giorno - ${day.temp.day} °C</div>
            <div class="temp">Notte - ${day.temp.night} °C</div>
        </div>
        
        `;
    }
})

weatherForecastEl.innerHTML = otherDayForecast;
}

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude,longitude} = success.coords;
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,minutely&units=metric&lang=it&appid=bd0a2f0b34731afcfbaad0ca016953de').then(response => response.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        })
    })
};