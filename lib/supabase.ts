// lib/supabase.js
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'

const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {}
//console.log('Supabase extra config:', extra)

const SUPABASE_URL = extra.SUPABASE_URL
const SUPABASE_ANON_KEY = extra.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in app config')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)