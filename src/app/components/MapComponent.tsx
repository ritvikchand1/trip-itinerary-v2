'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '../types';

interface MapComponentProps {
  center: [number, number];
  markers?: Location[];
  onMarkerClick?: (location: Location) => void;
}

export default function MapComponent({ center, markers = [], onMarkerClick }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 12,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-right');

    markers.forEach((marker) => {
      const markerElement = new mapboxgl.Marker()
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${marker.name}</h3><p>${marker.address}</p>`))
        .addTo(map.current!);

      if (onMarkerClick) {
        markerElement.getElement().addEventListener('click', () => {
          onMarkerClick(marker);
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [center, markers, onMarkerClick]);

  return <div ref={mapContainer} className="w-full h-full" />;
} 