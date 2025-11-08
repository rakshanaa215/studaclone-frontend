import SearchBar from '../components/SearchBar'
import ListingCard from '../components/ListingCard'
import Hero from '../components/Hero'
import { MOCK_LISTINGS } from '../lib/mock'
import { API_BASE, USE_MOCK } from '../lib/config'

/** Use backend when USE_MOCK=false, else local mock data */
async function fetchListings(searchParams) {
  if (USE_MOCK) {
    return { items: MOCK_LISTINGS, total: MOCK_LISTINGS.length }
  }
  const sp = new URLSearchParams(searchParams).toString()
  const res = await fetch(`${API_BASE}/listings?${sp}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load listings')
  return res.json() // { items, total }
}

/** Client-side filtering so the UI works with mock data, too */
function applyLocalFilters(items, searchParams) {
  let out = [...items]
  const q = (searchParams?.q || '').toLowerCase()
  const city = (searchParams?.city || '').toLowerCase()
  const min = Number(searchParams?.minPrice || 0)
  const max = Number(searchParams?.maxPrice || 0)

  if (q) out = out.filter(i =>
    i.title.toLowerCase().includes(q) ||
    i.description?.toLowerCase().includes(q)
  )
  if (city) out = out.filter(i => i.city.toLowerCase().includes(city))
  if (min) out = out.filter(i => i.priceMonth >= min)
  if (max) out = out.filter(i => i.priceMonth <= max)

  return out
}

export default async function Home({ searchParams }) {
  const { items } = await fetchListings(searchParams)
  const filtered = applyLocalFilters(items, searchParams)

  return (
    <div className="space-y-6">
      <Hero />
      <SearchBar />
      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">
          No listings yet. Try another city or reduce filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}
