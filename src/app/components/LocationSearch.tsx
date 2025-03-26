'use client';

import { useState, useEffect, useRef } from 'react';
import { Location } from '../types';

interface LocationSearchProps {
  onSelect: (location: Location) => void;
  placeholder?: string;
}

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
  text: string;
}

interface MapboxResponse {
  features: MapboxFeature[];
}

export default function LocationSearch({ onSelect, placeholder = 'Search for a location...' }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const searchLocation = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }

        const data: MapboxResponse = await response.json();
        setResults(data.features.map((feature) => ({
          id: feature.id,
          name: feature.text,
          address: feature.place_name,
          coordinates: feature.center,
        })));
      } catch (err) {
        setError('Failed to search locations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(searchLocation, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
          <ul className="max-h-60 overflow-auto">
            {results.map((location) => (
              <li
                key={location.id}
                onClick={() => {
                  onSelect(location);
                  setQuery('');
                  setResults([]);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium text-gray-900">{location.name}</div>
                <div className="text-sm text-gray-500">{location.address}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 