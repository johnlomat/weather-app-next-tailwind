const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'

// API key management functions
export const getApiKey = (): string | undefined => {
  return process.env.NEXT_PUBLIC_WEATHER_API_KEY
}

export const validateApiKey = (apiKey: string | undefined): string => {
  if (!apiKey) {
    throw new Error('API key is missing. Please check your environment variables.')
  }
  return apiKey
}

export interface WeatherApiConfig {
  apiKey: string
}

export interface CurrentWeather {
  temp_c: number
  condition: {
    text: string
    icon: string
    code: number
  }
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  localtime: string
}

export interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    condition: {
      text: string
      icon: string
      code: number
    }
    daily_chance_of_rain: number
  }
  hour: Array<{
    time: string
    temp_c: number
    condition: {
      text: string
      icon: string
      code: number
    }
    chance_of_rain: number
  }>
}

export interface WeatherForecast {
  location: Location
  current: CurrentWeather
  forecast: {
    forecastday: ForecastDay[]
  }
}

export const weatherApi = {
  getCurrentWeather: async (city: string, apiKey?: string) => {
    const validApiKey = apiKey || validateApiKey(getApiKey())
    const response = await fetch(
      `${WEATHER_API_BASE_URL}/current.json?key=${validApiKey}&q=${city}&aqi=no`,
    )
    if (!response.ok) throw new Error('Failed to fetch current weather')
    return response.json()
  },

  getForecast: async (city: string, apiKey?: string, days: number = 3) => {
    const validApiKey = apiKey || validateApiKey(getApiKey())
    const response = await fetch(
      `${WEATHER_API_BASE_URL}/forecast.json?key=${validApiKey}&q=${city}&days=${days}&aqi=no`,
    )
    if (!response.ok) throw new Error('Failed to fetch forecast')
    return response.json() as Promise<WeatherForecast>
  },

  getCurrentWeatherForCity: async (city: string, apiKey?: string, country: string = 'ph') => {
    const validApiKey = apiKey || validateApiKey(getApiKey())
    const response = await fetch(
      `${WEATHER_API_BASE_URL}/current.json?key=${validApiKey}&q=${city},${country}&aqi=no`,
    )
    if (!response.ok) throw new Error(`Failed to fetch weather for ${city}`)
    return response.json()
  },
}
