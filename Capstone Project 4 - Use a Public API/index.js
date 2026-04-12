// IMPORTS
import express from "express";
import axios from "axios";

// CONSTS
const app = express();
const port = 3000;
const PRAYER_API = "https://api.aladhan.com/v1";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

// WEATHER
const latitude = 41.8781;
const longitude = -87.6298;
const weathercodes = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm"
};

// PUBLIC
app.use(express.static("public"));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${PRAYER_API}/timingsByCity/today`, {
            params: {
                city: "Chicago",
                country: "US",
                method: 2,
            }
        });
        const wresult = await axios.get(`${WEATHER_API}`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                current_weather: true,
                timezone: "America/Chicago",
                temperature_unit: "fahrenheit",
            }
        });
        console.log(result.data.data.timings);
        console.log(wresult.data.current_weather);
        const prayerData = result.data.data.timings;
        const weatherData = wresult.data; // will have to access wresult.data and wresult.data.current_weather
        const conditions = weatherData.current_weather.weathercode;
        res.render("index.ejs", { 
            prayerData: prayerData,
            weatherData: weatherData,
            conditions: weathercodes[conditions],
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

// LISTEN
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});