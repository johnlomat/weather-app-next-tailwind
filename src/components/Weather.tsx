'use client'

import { useState, useEffect } from 'react'
import { weatherApi, WeatherForecast } from '@/services/weatherApi'
import TodayOverview from './TodayOverview'
import SearchResult from './SearchResult'
import Header from './Header'
import Footer from './Footer'

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

export default function Weather() {
  const [searchCity, setSearchCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cityWeathers, setCityWeathers] = useState<CityWeather[]>([])
  const [searchData, setSearchData] = useState<WeatherForecast | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Philippine cities to fetch weather data for
  const philippineCities = [
    'Batanes',
    'Samar',
    'Manila',
    'Cebu City',
    'Zamboanga',
    'Quezon',
    'Cagayan de Oro',
    'Bulacan',
    'Leyte',
    'Laguna',
    'Benguet',
    'Cavite City',
    'Batangas City',
    'General Santos',
    'Davao City',
    'Albay',
  ]

  // Fetch weather data for all cities on component mount
  useEffect(() => {
    const fetchAllCitiesWeather = async () => {
      try {
        const weatherPromises = philippineCities.map(async (city) => {
          try {
            const data = await weatherApi.getCurrentWeatherForCity(city)

            return {
              id: `${data.location.lat}-${data.location.lon}`,
              name: data.location.name,
              region: data.location.region,
              country: data.location.country,
              temp_c: data.current.temp_c,
              condition: data.current.condition.text,
              icon: data.current.condition.icon.startsWith('//')
                ? `https:${data.current.condition.icon}`
                : data.current.condition.icon,
              description: data.current.condition.text,
            }
          } catch (error) {
            console.error(`Error fetching ${city} weather:`, error)
            return null
          }
        })

        const results = await Promise.all(weatherPromises)
        const validResults = results.filter((result) => result !== null) as CityWeather[]

        if (validResults.length > 0) {
          setCityWeathers(validResults)
        } else {
          setError('Failed to fetch weather data for any city.')
        }
      } catch (error) {
        console.error('Error fetching all cities weather:', error)
        setError('Failed to fetch weather data. Please try again later.')
      }
    }

    fetchAllCitiesWeather()
  }, [])

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchCity.trim()) return

    try {
      setLoading(true)
      setError('')

      const data = await weatherApi.getForecast(searchCity)
      setSearchData(data)
      setHasSearched(true)

      // Add the searched city to the grid if it's not already there
      const exists = cityWeathers.some(
        (city) =>
          city.name.toLowerCase() === data.location.name.toLowerCase() &&
          city.country.toLowerCase() === data.location.country.toLowerCase(),
      )

      if (!exists) {
        const newCity: CityWeather = {
          id: `${data.location.lat}-${data.location.lon}`,
          name: data.location.name,
          region: data.location.region,
          country: data.location.country,
          temp_c: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon.startsWith('//')
            ? `https:${data.current.condition.icon}`
            : data.current.condition.icon,
          description: data.current.condition.text,
        }

        setCityWeathers((prev) => [newCity, ...prev])
      }
    } catch (error) {
      console.error('Weather fetch error:', error)
      setError('Failed to fetch weather data. Please check the city name and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg bg-gradient-to-b from-blue-100 to-blue-200 p-4 shadow-lg">
      <Header
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        loading={loading}
        error={error}
        fetchWeather={fetchWeather}
      />

      {!hasSearched && <TodayOverview cityWeathers={cityWeathers} loading={loading} />}
      <SearchResult searchData={searchData} loading={loading} />

      <Footer />
    </div>
  )
}
