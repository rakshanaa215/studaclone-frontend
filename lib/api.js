const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  })

  if (!res.ok) {
    let txt = 'Request failed'
    try {
      const j = await res.json()
      txt = j.error || JSON.stringify(j)
    } catch {}
    throw new Error(txt)
  }
  return res.json()
}
