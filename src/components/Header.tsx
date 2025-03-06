'use client'

interface HeaderProps {
  searchCity: string
  setSearchCity: (value: string) => void
  loading: boolean
  error: string
  fetchWeather: (e: React.FormEvent) => Promise<void>
}

export default function Header({
  searchCity,
  setSearchCity,
  loading,
  error,
  fetchWeather,
}: HeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center">
        <div className="mr-2 rounded bg-yellow-400 p-1">
          <span className="text-white">☀️</span>
        </div>
        <span className="text-sm">Philippines</span>
      </div>

      <form onSubmit={fetchWeather} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city name, IP address or Latitude/Longitude (decimal degree)"
            className="flex-1 rounded-l-lg border border-gray-300 bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-yellow-400 px-4 py-2 text-white transition duration-300 hover:bg-yellow-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>

      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
    </div>
  )
}
