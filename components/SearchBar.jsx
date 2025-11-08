'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [city, setCity] = useState(params.get('city') || '')
  const [minPrice, setMinPrice] = useState(params.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') || '')

  useEffect(() => {
    setQ(params.get('q') || '')
    setCity(params.get('city') || '')
    setMinPrice(params.get('minPrice') || '')
    setMaxPrice(params.get('maxPrice') || '')
  }, [params])

  function submit(e) {
    e.preventDefault()
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (city) sp.set('city', city)
    if (minPrice) sp.set('minPrice', minPrice)
    if (maxPrice) sp.set('maxPrice', maxPrice)
    router.push(`/?${sp.toString()}`)
  }

  return (
    <form onSubmit={submit} className="card p-3 md:p-4 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <input className="input" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
        <input className="input" placeholder="Min €" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        <input className="input" placeholder="Max €" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        <button className="btn">Search</button>
      </div>
    </form>
  )
}
