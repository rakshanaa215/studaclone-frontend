'use client'
import Link from 'next/link'
import { useState } from 'react'

const fallbackFor = (id) =>
  `https://picsum.photos/seed/${encodeURIComponent(id)}/1200/900`

export default function ListingCard({ listing }) {
  const initial =
    listing?.images?.[0] || fallbackFor(listing?.id || Math.random().toString(36))
  const [imgSrc, setImgSrc] = useState(initial)

  return (
    <article className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="h-56 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={imgSrc}
          alt={listing.title}
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(fallbackFor(listing.id))}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <h3 className="mt-3 text-lg font-semibold line-clamp-1">{listing.title}</h3>
      <p className="text-sm text-gray-600">{listing.city}</p>
      <div className="mt-2 font-bold">
        {(listing.priceMonth / 100).toFixed(0)} € / month
      </div>

      <Link
        href={`/listing/${listing.id}`}
        className="inline-block mt-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
      >
        View
      </Link>
    </article>
  )
}
