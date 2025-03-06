'use client'

import Image from 'next/image'
import { TodayOverviewSkeleton } from './SkeletonLoaders'

interface CityWeather {
  id: string
  name: string
  region: string
  country: string
  temp_c: number
  condition: string
  icon: string
  description: string
}

interface TodayOverviewProps {
  cityWeathers: CityWeather[]
  loading: boolean
}

export default function TodayOverview({ cityWeathers, loading }: TodayOverviewProps) {
  if (loading || cityWeathers.length === 0) {
    return <TodayOverviewSkeleton />
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Today Overview</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cityWeathers.map((city) => (
          <div
            key={city.id}
            className="flex flex-col justify-center rounded-lg bg-gray-100 p-4 shadow-sm"
          >
            <h3 className="text-center text-lg font-semibold text-gray-800">
              {city.name}, {city.country}
            </h3>

            <div className="my-4 flex items-center justify-center">
              {city.icon ? (
                <div className="relative mr-2 h-12 w-12">
                  <Image
                    src={city.icon.startsWith('//') ? `https:${city.icon}` : city.icon}
                    alt={city.condition}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              ) : (
                <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-500">
                  No Icon
                </div>
              )}
              <span className="text-4xl font-bold">
                {Math.round(city.temp_c)}°<span className="text-sm">C</span>
              </span>
            </div>

            <p className="text-center text-gray-700">{city.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
