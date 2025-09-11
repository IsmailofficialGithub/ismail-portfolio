
const ProjectDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info Skeleton */}
            <div className="space-y-6">
              {/* Status Badges */}
              <div className="flex items-center space-x-4">
                <div className="w-24 h-8 bg-gray-700/50 rounded-full animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-700/50 rounded-full animate-pulse"></div>
              </div>

              {/* Title */}
              <div className="space-y-3">
                <div className="w-3/4 h-12 bg-gray-700/50 rounded-lg animate-pulse"></div>
                <div className="w-full h-4 bg-gray-700/50 rounded animate-pulse"></div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-2/3 h-4 bg-gray-700/50 rounded animate-pulse"></div>
              </div>

              {/* Date */}
              <div className="w-40 h-5 bg-gray-700/50 rounded animate-pulse"></div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-32 h-12 bg-gray-700/50 rounded-lg animate-pulse"></div>
                <div className="w-36 h-12 bg-gray-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Main Image Carousel Skeleton */}
            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-700/50 animate-pulse">
                {/* Navigation arrows skeleton */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-600/70 rounded-full animate-pulse"></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-600/70 rounded-full animate-pulse"></div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 w-16 h-8 bg-gray-600/70 rounded-full animate-pulse"></div>
              </div>

              {/* Thumbnail navigation skeleton */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-700/50 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 rounded-2xl p-8">
          {/* Section title */}
          <div className="w-48 h-8 bg-gray-700/50 rounded-lg animate-pulse mb-6"></div>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="w-24 h-10 bg-gray-700/50 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Gallery Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gray-900 rounded-2xl p-8">
          {/* Section title */}
          <div className="w-40 h-8 bg-gray-700/50 rounded-lg animate-pulse mb-6"></div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="aspect-video rounded-lg bg-gray-700/50 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailSkeleton;