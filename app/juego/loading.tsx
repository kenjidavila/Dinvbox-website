import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-md mx-auto" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        <div className="text-center">
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}
