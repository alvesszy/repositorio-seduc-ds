const apiKey = "987e0d1ea7e21d39cc83b295b2ab185c";

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Cidade não encontrada.");
    }

    return await response.json();
}

async function axiosWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await axios.get(url);

    return response.data;
}

function displayWeather(data) {
    const result = document.getElementById("result");

    result.innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡️ Temperatura: ${data.main.temp}°C</p>
        <p>💧 Umidade: ${data.main.humidity}%</p>
        <p>☁️ Clima: ${data.weather[0].description}</p>
    `;

    document.getElementById("error").innerHTML = "";
}

function displayError(message) {
    document.getElementById("error").innerHTML = `
        <p style="color: red;">${message}</p>
    `;

    document.getElementById("result").innerHTML = "";
}

async function getWeather() {
    const city = document.getElementById("city").value;
    const method = document.getElementById("method").value;

    if (city.trim() === "") {
        displayError("Digite uma cidade.");
        return;
    }

    try {
        let data;

        if (method === "fetch") {
            data = await fetchWeather(city);
        } else {
            data = await axiosWeather(city);
        }

        displayWeather(data);

    } catch (error) {
        displayError("Não foi possível consultar o clima.");
    }
}
