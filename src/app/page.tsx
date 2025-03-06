import Weather from '@/components/Weather';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <Weather />
    </main>
  );
}
