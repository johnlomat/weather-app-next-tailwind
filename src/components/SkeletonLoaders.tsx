// Server component for skeleton loaders

export const TodayOverviewSkeleton = () => {
  // Create an array of 16 skeleton cards
  const skeletonCards = Array(16)
    .fill(0)
    .map((_, index) => (
      <div key={`skeleton-${index}`} className="animate-pulse rounded-lg bg-gray-100 p-4 shadow-sm">
        <div className="mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="my-4 flex items-center justify-center">
          <div className="mr-2 h-12 w-12 rounded-full bg-gray-200"></div>
          <div className="h-10 w-1/4 rounded bg-gray-200"></div>
        </div>
        <div className="mx-auto h-4 w-1/2 rounded bg-gray-200"></div>
      </div>
    ))

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Today Overview</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skeletonCards}
      </div>
    </div>
  )
}

export const SearchResultSkeleton = () => (
  <div className="mt-8 animate-pulse rounded-lg bg-white p-6 shadow-md">
    {/* Location header skeleton */}
    <div className="mb-6 h-8 w-1/2 rounded bg-gray-200"></div>

    {/* Current Weather skeleton */}
    <div className="mb-6 flex flex-col items-stretch justify-between gap-4 rounded-lg bg-gray-50 p-4 md:flex-row md:items-center">
      <div className="flex items-center">
        <div className="mr-4 h-16 w-16 rounded-full bg-gray-200"></div>
        <div>
          <div className="mb-2 h-5 w-24 rounded bg-gray-200"></div>
          <div className="h-8 w-16 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="ms-auto">
        <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-5 w-24 rounded bg-gray-200"></div>
      </div>
    </div>

    {/* 3-Day Forecast skeleton */}
    <div className="mb-3 h-6 w-40 rounded bg-gray-200"></div>
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 h-5 w-1/2 rounded bg-gray-200"></div>
          <div className="mb-3 flex items-center">
            <div className="mr-2 h-12 w-12 rounded-full bg-gray-200"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="mb-1 h-3 w-8 rounded bg-gray-200"></div>
              <div className="h-4 w-10 rounded bg-gray-200"></div>
            </div>
            <div>
              <div className="mb-1 h-3 w-8 rounded bg-gray-200"></div>
              <div className="h-4 w-10 rounded bg-gray-200"></div>
            </div>
            <div>
              <div className="mb-1 h-3 w-8 rounded bg-gray-200"></div>
              <div className="h-4 w-10 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Hourly Forecast skeleton */}
    <div className="mb-3 h-6 w-40 rounded bg-gray-200"></div>
    <div className="w-full overflow-x-auto">
      <div className="grid w-full grid-cols-8 gap-2 pb-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="col-span-8 flex flex-row items-center justify-between rounded-lg bg-gray-50 p-3 md:col-span-1 md:flex-col"
          >
            <div className="mb-2 h-4 w-12 rounded bg-gray-200"></div>
            <div className="my-2 h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="mb-1 h-4 w-10 rounded bg-gray-200"></div>
            <div className="h-3 w-14 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
