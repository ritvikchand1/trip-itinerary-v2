'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Itinerary, Location } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import LocationSearch from './LocationSearch';

interface EditItineraryFormProps {
  id: string;
}

export default function EditItineraryForm({ id }: EditItineraryFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const docRef = doc(db, 'itineraries', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as Itinerary;
          if (data.userId !== user.id) {
            router.push('/itineraries');
            return;
          }
          setItinerary(data);
          setFormData({
            title: data.title,
            description: data.description || '',
            startDate: data.startDate,
            endDate: data.endDate,
          });
        } else {
          setError('Itinerary not found');
        }
      } catch (err) {
        setError('Failed to fetch itinerary');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itinerary) return;

    try {
      const docRef = doc(db, 'itineraries', itinerary.id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      router.push(`/itineraries/${itinerary.id}`);
    } catch (err) {
      setError('Failed to update itinerary');
      console.error(err);
    }
  };

  const handleLocationSelect = (location: Location) => {
    if (!itinerary) return;
    const updatedItinerary = {
      ...itinerary,
      destination: location,
    } as Itinerary;
    setItinerary(updatedItinerary);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Itinerary not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Itinerary</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <LocationSearch onSelect={handleLocationSelect} />
          {itinerary.destination && (
            <div className="mt-4 p-2 bg-gray-50 rounded">
              <div className="font-medium">{itinerary.destination.name}</div>
              <div className="text-sm text-gray-500">{itinerary.destination.address}</div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push(`/itineraries/${itinerary.id}`)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 