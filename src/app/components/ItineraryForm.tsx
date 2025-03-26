import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Itinerary, Location } from '../types';
import MapComponent from './MapComponent';
import LocationSearch from './LocationSearch';

interface ItineraryFormProps {
  initialData?: Partial<Itinerary>;
  onSubmit: (data: Partial<Itinerary>) => void;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Itinerary>>({
    title: '',
    description: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    days: [],
    ...initialData,
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    initialData.destination || null
  );

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    if (date) {
      setFormData((prev) => ({ ...prev, [field]: date.toISOString() }));
      setError(null);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setFormData((prev) => ({ ...prev, destination: location }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title?.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!selectedLocation) {
      setError('Please select a destination');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      setError('End date must be after start date');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={formData.startDate ? new Date(formData.startDate) : null}
            onChange={(date) => handleDateChange(date, 'startDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={formData.endDate ? new Date(formData.endDate) : null}
            onChange={(date) => handleDateChange(date, 'endDate')}
            minDate={formData.startDate ? new Date(formData.startDate) : undefined}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Destination
        </label>
        <div className="mb-4">
          <LocationSearch
            onSelect={handleLocationSelect}
            placeholder="Search for a destination..."
          />
        </div>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapComponent
            center={selectedLocation?.coordinates || [-74.006, 40.7128]}
            markers={selectedLocation ? [selectedLocation] : []}
            onMarkerClick={handleLocationSelect}
          />
        </div>
        {selectedLocation && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {selectedLocation.name}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {initialData.id ? 'Update Itinerary' : 'Create Itinerary'}
        </button>
      </div>
    </form>
  );
};

export default ItineraryForm; 