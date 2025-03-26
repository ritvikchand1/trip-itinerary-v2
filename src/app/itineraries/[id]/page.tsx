'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import ItineraryDetail from '../../components/ItineraryDetail';

export default function ItineraryDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ItineraryDetail id={id} />
    </Suspense>
  );
} 