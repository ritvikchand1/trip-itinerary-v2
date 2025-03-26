export interface Location {
  id?: string;
  name: string;
  fullName: string;
  address: string;
  coordinates: [number, number];
}

export interface Activity {
  id: string;
  title: string;
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
  destination: Location;
  days: Day[];
  createdAt: string;
  updatedAt: string;
} 