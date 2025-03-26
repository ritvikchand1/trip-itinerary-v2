export interface Location {
  id: string;
  name: string;
  fullName: string;
  coordinates: [number, number];
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  locations: Location[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeatherResponse {
  main: {
    temp: number;
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

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
} 