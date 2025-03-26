class WeatherService {
  private apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  private baseUrl = 'https://api.openweathermap.org/data/3.0';

  async getWeather(lat: number, lon: number) {
    const response = await fetch(
      `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return response.json();
  }
}

export const weatherService = new WeatherService(); 