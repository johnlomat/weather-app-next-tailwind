'use client'

export default function Footer() {
  return (
    <div className="mt-8 text-center text-sm text-gray-600">
      Powered by{' '}
      <a href="https://www.weatherapi.com/" className="text-blue-500 hover:underline">
        WeatherAPI.com
      </a>
      <p>
        Developed by
        <a href="https://johnlomat.vercel.app/" className="text-blue-500 hover:underline">
          John Lomat
        </a>
      </p>
    </div>
  )
}
