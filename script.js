const apiKey = 'cff1ab69c300a764e01a11b879d94e37';
const unit = 'metric';

const input = document.querySelector('input');
const button = document.querySelector('button');
const weatherContainer = document.querySelector('.weather-container');

const generateWeatherCard = ({cityName, temp, feels_like, cloud, humidity, wind, pressure, iconCode,id}) =>`
<div class="max-w-screen-xl mx-auto px-4 py-8">
<div class="w-1/2 bg-gray-200 mx-auto rounded-2xl shadow-lg">
    <div class="flex flex-col gap-4 items-center px-4 py-8">
        <h1 class="font-bold text-xl">${cityName}</h1>
        <div class="flex gap-4 justify-between">
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="temp_icon" class="">
            <p class="font-bold text-6xl">${temp}°C</p> 
        </div>
    </div>
    <div class="flex justify-evenly px-4 py-8">
        <div class="flex flex-col items-center">
            <p class="text-2xl font-semibold">${feels_like}°C</p>
            <p>Feels like</p>
        </div>
        <div class="flex flex-col items-center">
            <p class="text-2xl font-semibold">${cloud}%</p>
            <p>Clouds</p>
        </div>
        <div class="flex flex-col items-center">
            <p class="text-2xl font-semibold">${humidity}%</p>
            <p>Humidity</p>
        </div>
        <div class="flex flex-col items-center">
            <p class="text-2xl font-semibold">${wind} m/s</p>
            <p>Wind</p>
        </div>
        <div class="flex flex-col items-center">
            <p class="text-2xl font-semibold">${pressure}hPa</p>
            <p>Pressure</p>
        </div>
    </div>
    <div class="p-4 flex justify-center">
        <a href="http://openweathermap.org/city/${id}?utm_source=openweathermap&utm_medium=widget&utm_campaign=html_old" target="_blank"><u>See Full Weather Forecast</u></a>
    </div>
</div>
</div>
`;

const generateErrorCard = (cod, message)=> `
<div class="max-w-screen-xl mx-auto">
<div class="w-1/2 mx-auto">
  <div class="flex flex-col items-center px-4 py-8">
    <p class="text-8xl font-extrabold">${cod}</p>
    <p class="text-xl font-bold">Oops! ${message}</p>
    <p class="text-center">Please enter valid city name to get weather details</p>
  </div>
</div>
</div>
`;

const searchWeather = async()=>{
    try {
        button.disabled = true;
        button.textContent = 'Searching...';
        weatherContainer.innerHTML = '';

        const city = input.value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=${unit}&q=${city}&appid=${apiKey}`);
        const data = await response.json();
        const { name, sys, main, clouds, wind, weather, id, cod, message } = data;

        if (response.ok) {
            weatherContainer.innerHTML = generateWeatherCard({
                cityName: `${name}, ${sys.country}`,
                temp: Math.round(main.temp),
                feels_like: Math.round(main.feels_like),
                cloud: clouds.all,
                humidity: main.humidity,
                wind: wind.speed,
                pressure: main.pressure,
                iconCode: weather[0].icon,
                id: id
              });              
        }
        else{
            weatherContainer.innerHTML = generateErrorCard(cod, message);
        }   
    } catch (error) {
        console.log(error);
    } finally{
        button.disabled = false;
        button.textContent = 'Search';
    }
}

button.addEventListener('click', searchWeather);