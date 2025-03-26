import { WeatherResponse } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherResponse> {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  },

  async getForecast(lat: number, lon: number): Promise<WeatherResponse[]> {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    const data = await response.json();
    return data.list.filter((item: WeatherResponse, index: number) => index % 8 === 0).slice(0, 5);
  },
}; 