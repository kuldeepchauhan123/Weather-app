import { useEffect, useState } from "react";
import "./App.css";
import sun from "./assets/sun.png";
import clouds from "./assets/clouds.png";
import rain from "./assets/rain.png";
import clear from "./assets/clear.png";
import temp from "./assets/temp.png";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState();

  const API_key = "cc71182d6b256a3c07833f70ce66f3f1";

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = () => {
    if (city === "") {
      alert("Please enter a city name");
    } else {
      getWeatherData();
    }
  };

  const getWeatherImage = () => {
    if (!weatherData) return sun; // default image

    const condition = weatherData.weather[0].main.toLowerCase();

    switch (condition) {
      case "clear":
        return clear;
      case "clouds":
        return clouds;
      case "rain":
        return rain;
      case "drizzle":
        return rain;
      case "thunderstorm":
        return sun;
      default:
        return clear;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="w-md rounded-lg p-5 shadow-2xl bg-amber-50">
          <h1 className="text-3xl font-extrabold border-b mb-4 pb-4 text-center">
            Weather App
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              className="block w-full p-3 border rounded"
              placeholder="Enter city name"
              onChange={handleChange}
            />
            <button
              onClick={getWeather}
              className="shrink-0 bg-green-500 hover:bg-green-600 text-white font-semibold p-3 cursor-pointer rounded-sm"
            >
              Get Weather
            </button>
          </div>
          <div className="text-center mt-5">
            {weatherData ? (
              <>
                <h2 className="font-extrabold text-xl">{weatherData.name}</h2>
                <div className="mx-auto my-5">
                  <img
                    src={getWeatherImage()}
                    style={{ width: 180 }}
                    className="mx-auto"
                  />
                  <p className="font-semibold text-xl">{weatherData.weather[0].main}</p>
                </div>
                <div>
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <img src={temp} style={{ width: 46 }} />
                    <h3 className="font-extrabold text-2xl ">
                      Temp: {weatherData.main.temp}{" "}
                      <span className="text-sm">°C</span>
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 font-semibold">
                  <span>Humidity: {weatherData.main.humidity}%</span>
                  <span>Feels Like: {weatherData.main.feels_like}</span>
                  <span>Wind: {weatherData.wind.speed}</span>
                </div>
              </>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
