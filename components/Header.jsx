'use client'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = Cookies.get('user')
    if (u) setUser(JSON.parse(u))
  }, [])

  function logout() {
    Cookies.remove('token')
    Cookies.remove('user')
    setUser(null)
    router.push('/login')
  }

  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 h-14 flex items-center gap-6">
        <Link href="/" className="font-extrabold text-lg tracking-tight">Studaclone</Link>

        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <button onClick={logout} className="btn h-9 px-3">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link href="/register" className="btn h-9 px-3">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
