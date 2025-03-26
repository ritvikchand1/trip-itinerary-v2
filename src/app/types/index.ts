export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId?: string;
  types?: string[];
}

export interface Activity {
  id: string;
  title: string;
  location: Location;
  startTime: string;
  endTime: string;
  notes?: string;
  category?: string;
}

export interface DayPlan {
  id: string;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destination: Location;
  days: DayPlan[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  preferences?: {
    defaultTransportMode?: 'driving' | 'walking' | 'bicycling' | 'transit';
    currency?: string;
    language?: string;
  };
}

export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
} 