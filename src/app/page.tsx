'use client';

import Link from "next/link";
import { HomeIcon, MapIcon, CalendarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Plan your perfect trip with ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create detailed travel itineraries, discover amazing places, and keep track of your entire journey
              in one place. Perfect for solo travelers and group trips alike.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Plan Better</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to plan your trip
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create detailed itineraries, track weather, and discover new places with our comprehensive trip planning tools.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <HomeIcon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                Create Itineraries
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Build detailed day-by-day itineraries for your trips.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <MapIcon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                Discover Places
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Find and explore amazing destinations around the world.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <CalendarIcon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                Track Weather
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Stay updated with weather forecasts for your destinations.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
