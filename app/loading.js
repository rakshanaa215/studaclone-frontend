export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {[...Array(5)].map((_,i)=>(<div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_,i)=>(
          <div key={i} className="h-56 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}
