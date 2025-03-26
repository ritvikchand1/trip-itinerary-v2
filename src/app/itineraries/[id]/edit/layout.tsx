import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Itinerary',
  description: 'Edit your trip itinerary',
};

export default function EditItineraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 