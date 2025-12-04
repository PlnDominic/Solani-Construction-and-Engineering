import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create client with empty strings if env vars not set (build time)
// Will fail at runtime if actually used without proper config
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export function checkSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
}

export type Property = {
  id: string
  title: string
  description: string
  price: number
  type: 'Land' | 'Residential' | 'Commercial' | 'Industrial'
  status: 'Available' | 'Under Offer' | 'Sold'
  location: string
  area_sq_m: number
  images: string[]
  features: string[]
  latitude?: number
  longitude?: number
  created_at?: string
  updated_at?: string
}
