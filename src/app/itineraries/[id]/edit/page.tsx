'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import EditItineraryForm from '../../../components/EditItineraryForm';

export default function EditItineraryPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <EditItineraryForm id={id} />
    </Suspense>
  );
} 