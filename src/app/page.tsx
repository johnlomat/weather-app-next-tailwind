import Weather from '@/components/Weather'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 px-4 py-12">
      <Weather />
    </main>
  )
}
