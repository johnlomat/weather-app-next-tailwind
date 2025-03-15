'use client'

import Image from 'next/image'
import { WeatherForecast } from '@/services/weatherApi'
import { SearchResultSkeleton } from './SkeletonLoaders'

interface SearchResultProps {
  searchData: WeatherForecast | null
  loading: boolean
}

export default function SearchResult({ searchData, loading }: SearchResultProps) {
  if (loading) {
    return <SearchResultSkeleton />
  }

  if (!searchData) {
    return null
  }

  const { location, current, forecast } = searchData

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        {location.name}, {location.country}
      </h2>

      {/* Current Weather */}
      <div className="mb-6 flex flex-col items-stretch justify-between gap-4 rounded-lg bg-gray-50 p-4 md:flex-row md:items-center">
        <div className="flex items-center">
          {current.condition.icon && (
            <div className="relative mr-4 h-16 w-16">
              <Image
                src={
                  current.condition.icon.startsWith('//')
                    ? `https:${current.condition.icon}`
                    : current.condition.icon
                }
                alt={current.condition.text}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
          <div>
            <p className="text-lg font-medium">{current.condition.text}</p>
            <p className="text-3xl font-bold">{Math.round(current.temp_c)}°C</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Local time</p>
          <p className="font-medium">{location.localtime}</p>
        </div>
      </div>

      {/* Forecast */}
      <h3 className="mb-3 text-xl font-semibold">3-Day Forecast</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {forecast.forecastday.map((day) => (
          <div key={day.date} className="rounded-lg bg-gray-50 p-4">
            <p className="mb-2 font-medium">
              {new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <div className="mb-3 flex items-center">
              {day.day.condition.icon && (
                <div className="relative mr-2 h-12 w-12">
                  <Image
                    src={
                      day.day.condition.icon.startsWith('//')
                        ? `https:${day.day.condition.icon}`
                        : day.day.condition.icon
                    }
                    alt={day.day.condition.text}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              <span>{day.day.condition.text}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-600">Min</p>
                <p className="font-bold">{Math.round(day.day.mintemp_c)}°C</p>
              </div>
              <div>
                <p className="text-gray-600">Max</p>
                <p className="font-bold">{Math.round(day.day.maxtemp_c)}°C</p>
              </div>
              <div>
                <p className="text-gray-600">Rain</p>
                <p className="font-bold">{day.day.daily_chance_of_rain}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Forecast for Today */}
      <h3 className="mt-6 mb-3 text-xl font-semibold">Hourly Forecast</h3>
      <div className="w-full overflow-x-auto">
        <div className="grid w-full grid-cols-8 gap-2 pb-2">
          {forecast.forecastday[0].hour
            .filter((_, index) => index % 3 === 0) // Show every 3 hours to save space
            .map((hour) => {
              // Format time to remove leading zeros
              const hourTime = new Date(hour.time)
              const formattedHour = hourTime.getHours() % 12 || 12 // Convert 0 to 12 for 12 AM
              const ampm = hourTime.getHours() >= 12 ? 'PM' : 'AM'

              return (
                <div
                  key={hour.time}
                  className="col-span-8 flex flex-row items-center justify-between rounded-lg bg-gray-50 p-3 md:col-span-1 md:flex-col"
                >
                  <p className="text-sm font-medium">
                    {formattedHour} {ampm}
                  </p>
                  {hour.condition.icon && (
                    <div className="relative my-2 h-10 w-10">
                      <Image
                        src={
                          hour.condition.icon.startsWith('//')
                            ? `https:${hour.condition.icon}`
                            : hour.condition.icon
                        }
                        alt={hour.condition.text}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                  <p className="font-bold">{Math.round(hour.temp_c)}°C</p>
                  <p className="text-xs text-gray-600">{hour.chance_of_rain}% rain</p>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
