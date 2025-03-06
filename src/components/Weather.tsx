"use client";

import { useState } from "react";
import Image from "next/image";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity?: number;
    feelslike_c?: number;
    wind_kph?: number;
  };
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`);

      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setError("Failed to fetch weather data. Please check the city name and try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Weather App</h1>

      <form onSubmit={fetchWeather} className="mb-6">
        <div className="flex">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {weather && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{weather.location.name}</h2>
              <p className="text-sm text-gray-600">{weather.location.region}, {weather.location.country}</p>
            </div>
            <div className="flex items-center">
              <Image 
                src={`https:${weather.current.condition.icon}`} 
                alt={weather.current.condition.text} 
                width={50} 
                height={50} 
              />
              <span className="text-2xl font-bold">{Math.round(weather.current.temp_c)}°C</span>
            </div>
          </div>

          <p className="text-gray-700 capitalize mb-4">{weather.current.condition.text}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {weather.current.feelslike_c && (
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Feels Like</p>
                <p className="text-lg font-semibold">{Math.round(weather.current.feelslike_c)}°C</p>
              </div>
            )}
            {weather.current.humidity && (
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Humidity</p>
                <p className="text-lg font-semibold">{weather.current.humidity}%</p>
              </div>
            )}
            {weather.current.wind_kph && (
              <div className="bg-white p-3 rounded-lg shadow-sm col-span-2">
                <p className="text-gray-500 text-sm">Wind Speed</p>
                <p className="text-lg font-semibold">{(weather.current.wind_kph / 3.6).toFixed(1)} m/s</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
