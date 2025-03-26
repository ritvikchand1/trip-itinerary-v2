'use client';

import { useEffect, useState } from 'react';
import { weatherService } from '../services/weather';
import Image from 'next/image';

interface WeatherWidgetProps {
  lat: number;
  lon: number;
  showForecast?: boolean;
}

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
  daily?: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export default function WeatherWidget({ lat, lon, showForecast = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeather = await weatherService.getCurrentWeather(lat, lon);
        const forecast = showForecast ? await weatherService.getForecast(lat, lon) : null;
        
        setWeather({
          current: {
            temp: currentWeather.main.temp,
            humidity: currentWeather.main.humidity,
            weather: currentWeather.weather,
          },
          daily: forecast?.map(day => ({
            dt: day.dt || Math.floor(Date.now() / 1000),
            temp: {
              min: day.main.temp_min || day.main.temp,
              max: day.main.temp_max || day.main.temp,
            },
            weather: day.weather,
          })),
        });
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, showForecast]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error || 'Weather data not available'}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
          alt={weather.current.weather[0].description}
          width={64}
          height={64}
        />
        <div>
          <div className="text-2xl font-bold">{Math.round(weather.current.temp)}°C</div>
          <div className="text-gray-600">{weather.current.weather[0].description}</div>
          <div className="text-gray-500">Humidity: {weather.current.humidity}%</div>
        </div>
      </div>

      {showForecast && weather.daily && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">5-Day Forecast</h3>
          <div className="grid grid-cols-2 gap-4">
            {weather.daily.map((day) => (
              <div key={day.dt} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">
                  {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    width={32}
                    height={32}
                  />
                  <div className="text-sm">
                    <span className="font-medium">{Math.round(day.temp.max)}°</span>
                    <span className="text-gray-500">/{Math.round(day.temp.min)}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 