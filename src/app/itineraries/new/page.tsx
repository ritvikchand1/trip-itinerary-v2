'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { itineraryService } from '../../services/itinerary';
import ItineraryForm from '../../components/ItineraryForm';
import { Itinerary } from '../../types';

export default function NewItineraryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<Itinerary>) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const itineraryId = await itineraryService.createItinerary(data, user.id);
      router.push(`/itineraries/${itineraryId}`);
    } catch (error: any) {
      console.error('Failed to create itinerary:', error);
      setError(error.message || 'Failed to create itinerary. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Itinerary</h1>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <ItineraryForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
} 