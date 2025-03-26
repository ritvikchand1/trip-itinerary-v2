export interface Location {
  id?: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface Day {
  id: string;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destination: Location;
  days: Day[];
  createdAt: string;
  updatedAt: string;
}

export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation?: number;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface WeatherResponse {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
} 