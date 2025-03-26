'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { itineraryService } from '../services/itinerary';
import { Itinerary } from '../types';
import MapComponent from './MapComponent';
import WeatherWidget from './WeatherWidget';
import { PencilIcon, TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ItineraryDetailProps {
  id: string;
}

export default function ItineraryDetail({ id }: ItineraryDetailProps) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const data = await itineraryService.getItinerary(id);
        if (!data) {
          setError('Itinerary not found');
          return;
        }
        setItinerary(data);
      } catch (err) {
        setError('Failed to load itinerary');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id, user, router]);

  const handleDelete = async () => {
    if (!itinerary) return;

    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await itineraryService.deleteItinerary(itinerary.id);
        router.push('/itineraries');
      } catch (err) {
        console.error('Failed to delete itinerary:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error || 'Itinerary not found'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{itinerary.title}</h1>
            {itinerary.description && (
              <p className="mt-2 text-gray-600">{itinerary.description}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push(`/itineraries/${itinerary.id}/edit`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Destination</h2>
              <div className="h-96">
                <MapComponent
                  center={itinerary.destination.coordinates}
                  markers={[itinerary.destination]}
                />
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <MapPinIcon className="h-5 w-5 mr-1" />
                {itinerary.destination.name}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Plans</h2>
              {itinerary.days.map((day, index) => (
                <div key={day.id} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Day {index + 1} - {new Date(day.date).toLocaleDateString()}
                  </h3>
                  {day.activities.length === 0 ? (
                    <p className="text-gray-500">No activities planned for this day.</p>
                  ) : (
                    <ul className="space-y-2">
                      {day.activities.map((activity) => (
                        <li key={activity.id} className="flex items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(activity.startTime).toLocaleTimeString()} -{' '}
                              {new Date(activity.endTime).toLocaleTimeString()}
                            </p>
                            {activity.notes && (
                              <p className="text-sm text-gray-500 mt-1">{activity.notes}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather</h2>
              <WeatherWidget
                lat={itinerary.destination.coordinates[1]}
                lon={itinerary.destination.coordinates[0]}
                showForecast={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 