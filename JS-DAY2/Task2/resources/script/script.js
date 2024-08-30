const searchInp = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');
const nameOut = document.getElementById('name-out');
const tempOut = document.getElementById('temp-out');
const humidOut = document.getElementById('humid-out');

let humidity;
let temperature;
let cityName;

searchBtn.addEventListener('click', async function() {
    const city = searchInp.value;
    searchInp.value = '';
    if (city == '') {
        const cityError = document.getElementById('city-err');
        cityError.innerText = "City name can't be empty!";
        return;
    }
    const apiKey = 'e124fb640b814c031daa1aabde059d48';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const res = await fetch(apiUrl);
        const apiData = await res.json();

        console.log(apiData);
        if (!res.ok) {
            throw new Error(`${apiData.cod}: ${apiData.message}`);
            
        } else {
            humidity = apiData.main.humidity;
            temperature = ((apiData.main.temp) - 273.15).toFixed(2);
            cityName = apiData.name;
            nameOut.innerText = cityName;
            humidOut.innerText = humidity;
            tempOut.innerText = temperature;
        }
    } catch (error) {
        console.error(error.message);
    }
})
