// const api = `https://api.openweathermap.org/data/2.5/weather?q=Kanpur&units=metric&appid=86090b474ffe36f00585c445a228ceb3`;
// const imgURL = `https://openweathermap.org/img/wn/04n.png`;

const apiKey = `86090b474ffe36f00585c445a228ceb3`;
var input = document.querySelector("input");
var main = document.querySelector(".main");
var search = document.querySelector(".fa");

input.addEventListener("keypress", function(e){
    if(e.key == "Enter") {
        console.log(input.value);
        getWeather(input.value)
        input.value = "";
    }
})

search.addEventListener("click", function(){
    getWeather(input.value)
    input.value = "";
})

const getWeather = async (city) => {
    main.innerHTML = "Loading...";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return showWeather(data);
}

const showWeather = (data) => {
    if(data.cod == "404")
    main.innerHTML = `<div class="space">City not found. Try searching a valid name!</div>`
    else {
        console.log(data);
        var temperature = parseFloat(data.main.temp).toFixed(1);
        main.innerHTML =
        `<h2 class="H2">Weather in 
            <span>${data.name}</span><span class="country"> (${data.sys.country})</span>
        </h2>
        
        <h1 class="H1">
            <span class="temp">${temperature}</span><span class="celcius">℃</span>
        </h1>
        
        <div class="weather">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather">
        
            <h4 class="desc">${data.weather[0].description}</h4>
        
        </div>
        
        <div class="footer">
            <h4 class="humidity">Humidity: 
                <span class="percent">${data.main.humidity}</span>%
            </h4>

            <span class="separation"></span>
        
            <h4 class="wind">Wind: 
                <span class="kmph">${data.wind.speed}</span>km/h
            </h4>
        </div>`
    }
}