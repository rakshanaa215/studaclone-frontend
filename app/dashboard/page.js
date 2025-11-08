'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await api('/listings')
    setItems(res.items)
  }

  async function create(e) {
    e.preventDefault()
    const token = Cookies.get('token')
    if (!token) { alert('Login first'); return }
    await api('/listings', {
      method: 'POST',
      token,
      body: {
        title, description, city,
        priceMonth: Number(price) * 100,
        images: []
      }
    })
    setTitle(''); setDescription(''); setCity(''); setPrice('')
    await load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={create} className="bg-white border rounded-2xl p-4 space-y-2">
        <h2 className="font-bold text-lg">Create Listing</h2>
        <input className="border rounded p-2 w-full" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border rounded p-2 w-full" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
        <input className="border rounded p-2 w-full" placeholder="Price €/month" value={price} onChange={e=>setPrice(e.target.value)} />
        <textarea className="border rounded p-2 w-full" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button className="bg-gray-900 text-white rounded p-2">Save</button>
      </form>

      <div className="space-y-3">
        <h2 className="font-bold text-lg">My Listings</h2>
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.id} className="bg-white border rounded-2xl p-3">
              <div className="font-semibold">{i.title}</div>
              <div className="text-sm text-gray-600">{i.city} • {(i.priceMonth/100).toFixed(0)} €</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
