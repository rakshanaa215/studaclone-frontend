import { MOCK_LISTINGS } from '../../../lib/mock'
import { API_BASE, USE_MOCK } from '../../../lib/config'

async function getListing(id) {
  if (USE_MOCK) return MOCK_LISTINGS.find(l => l.id === id) || null

  const res = await fetch(`${API_BASE}/listings/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}


export default async function ListingPage({ params }) {
  const listing = await getListing(params.id)
  if (!listing) return <div>Not found</div>

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3">
        <div className="h-80 bg-white border rounded-2xl overflow-hidden">
          {listing.images?.[0] && (
            <img src={listing.images[0]} className="w-full h-full object-cover" alt={listing.title} />
          )}
        </div>
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-gray-600">{listing.city}</p>
        <p>{listing.description}</p>
      </div>
      <div className="card p-4 space-y-3">
        <div className="text-xl font-semibold">
          {(listing.priceMonth / 100).toFixed(0)} € / month
        </div>
        <p className="text-sm text-gray-600">
          This is demo data. Connect the backend to enable real booking.
        </p>
      </div>
    </div>
  )
}
