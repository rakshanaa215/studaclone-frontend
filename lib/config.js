export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export const USE_MOCK =
  String(process.env.NEXT_PUBLIC_USE_MOCK || 'true').toLowerCase() === 'true'
