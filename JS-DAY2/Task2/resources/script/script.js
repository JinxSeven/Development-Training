const searchInp = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');
const nameOut = document.getElementById('name-out');
const tempOut = document.getElementById('temp-out');
const humidOut = document.getElementById('humid-out');

searchBtn.addEventListener('click', async function() {
    const city = searchInp.value;
    searchInp.value = '';
    if (city == '') {
        console.log('City name cant be empty!');
        return;
    }
    const apiKey = 'e124fb640b814c031daa1aabde059d48';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const res = await fetch(apiUrl);
        const apiData = await res.json();
        const humidity = apiData.main.humidity;
        const temprature = ((apiData.main.temp - 32) * 5 / 9).toFixed(2);
        const cityName = apiData.name;
        nameOut.innerText = cityName;
        tempOut.innerText = temprature;
        humidOut.innerText = humidity;
    } catch (error) {
        console.error(error);
    }
})
