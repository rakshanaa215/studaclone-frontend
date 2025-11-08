'use client'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await api('/auth/login', { method: 'POST', body: { email, password } })
      Cookies.set('token', res.token)
      Cookies.set('user', JSON.stringify(res.user))
      router.push('/')
    } catch (err) { setError(err.message) }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white border rounded-2xl p-6 space-y-3">
      <h1 className="text-xl font-bold">Login</h1>
      {error && <div className="text-red-600">{error}</div>}
      <input className="border rounded p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border rounded p-2 w-full" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full bg-gray-900 text-white rounded p-2">Login</button>
    </form>
  )
}
