import { Skeleton } from "@/components/ui/skeleton"

export default function SolucionesLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-24 w-full mx-auto" />
          </div>
        </div>
      </section>

      {/* Solutions Section Skeleton */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-16 w-full mx-auto" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <Skeleton className="h-10 w-10 rounded-lg mb-4" />
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/2 mb-4" />
                  <Skeleton className="h-24 w-full mb-6" />
                  <Skeleton className="h-10 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </section>
    </div>
  )
}
