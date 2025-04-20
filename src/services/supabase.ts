import { createClient } from '@supabase/supabase-js'

// These will be replaced with actual values later
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cxytopibqgijbhkcvtha.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eXRvcGlicWdpamJoa2N2dGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjEzMTAsImV4cCI6MjA1OTY5NzMxMH0.Z7gsg4MhdNN9JAHpqqLflF9Igj8w-qvmOCyUSe8TmzM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserCredentials {
  email: string
  password: string
}

export interface UserRegistration extends UserCredentials {
  firstName: string
  lastName: string
  age: number
  gender: string
}

export interface AuthResponse {
  user: any | null
  error: Error | null
}

export const signIn = async (credentials: UserCredentials): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })
    
    if (error) throw error
    
    return { user: data.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export const signUp = async (registration: UserRegistration): Promise<AuthResponse> => {
  try {
    // First register the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: registration.email,
      password: registration.password,
      options: {
        data: {
          first_name: registration.firstName,
          last_name: registration.lastName,
          age: registration.age,
          gender: registration.gender
        }
      }
    })
    
    if (error) throw error
    
    return { user: data.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

export const getCurrentUser = async (): Promise<{ user: any | null, error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.getUser()
    
    if (error) throw error
    
    return { user: data.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}
