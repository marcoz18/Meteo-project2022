async function getWeather(){
    let coord=await fetch("https://api.openweathermap.org/geo/1.0/direct?q=Milan&appid=bd0a2f0b34731afcfbaad0ca016953de",{method:"GET"});
    let coordObj= await coord.json();
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+coordObj[0].lat+"&lon="+coordObj[0].lon+"&appid=bd0a2f0b34731afcfbaad0ca016953de&units=metric&lang=it",{method:"GET"});
    let jsonObj = await response.json();
    console.log(jsonObj);
    document.getElementById('weather-temp').innerText= "A Milano ci sono "+ Math.round(jsonObj.main.temp) + "° con "+ jsonObj.weather[0].description;
}
getWeather();
