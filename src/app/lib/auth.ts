// lib/auth.ts
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura'

interface DecodedUser {
  id: string
  email: string
  role: 'CLIENT' | 'STYLIST'
  exp: number
  iat: number
}

// Verifica que el JWT sea válido y retorna el payload si lo es
export function verifyJWT(token: string): DecodedUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedUser
  } catch (error) {
    console.error('JWT inválido:', error)
    return null
  }
}

// Extrae el usuario desde el token (para usar en layouts, middleware, etc.)
export async function getUserFromToken(token: string): Promise<DecodedUser | null> {
  if (!token) return null
  const decoded = verifyJWT(token)
  return decoded || null
}
