async function getWeather(e){
    let coord=await fetch("https://api.openweathermap.org/geo/1.0/direct?q="+e+"&appid=bd0a2f0b34731afcfbaad0ca016953de",{method:"GET"});
    let coordObj= await coord.json();
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+coordObj[0].lat+"&lon="+coordObj[0].lon+"&appid=bd0a2f0b34731afcfbaad0ca016953de&units=metric&lang=it",{method:"GET"});
    let jsonObj = await response.json();
    x=document.getElementsByClassName('weather-temp');
    y=document.getElementsByClassName('weather-description');
    z=document.getElementsByClassName('weather-humidity');
    k=document.getElementsByClassName('weather-wind');
    for(var i = 0; i < x.length; i++){
        x[i].innerText=Math.round(jsonObj.main.temp) + "°";
        y[i].innerText=jsonObj.weather[0].description.charAt(0).toUpperCase()+jsonObj.weather[0].description.slice(1);
        z[i].innerText="Umidità "+jsonObj.main.humidity+"%";
        k[i].innerText="Vento "+jsonObj.wind.speed+" km/h";
    }
}
getWeather(document.querySelector('.active').getAttribute('data-bs-target'));
var myCarousel = document.getElementById('myCarousel')
myCarousel.addEventListener('slid.bs.carousel', function (e) {
    getWeather(e.target.querySelector('.active').getAttribute('data-bs-target'));
})
