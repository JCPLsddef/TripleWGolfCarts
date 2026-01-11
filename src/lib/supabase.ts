import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client only if environment variables are available (avoids build-time errors)
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface QuoteRequest {
  id?: string;
  created_at?: string;
  full_name: string;
  phone: string;
  email?: string;
  rental_start_date: string;
  rental_end_date: string;
  delivery_location: string;
  number_of_carts: number;
  cart_type: string;
  preferred_contact_method: string;
  best_time_to_call: string;
  notes?: string;
  understands_minimum: boolean;
  status?: string;
  email_sent?: boolean;
}

export async function submitQuoteRequest(data: Omit<QuoteRequest, 'id' | 'created_at' | 'status' | 'email_sent'>) {
  if (!supabase) {
    throw new Error('Supabase client is not configured. Please check your environment variables.');
  }

  const { data: result, error } = await supabase
    .from('quote_requests')
    .insert([{
      full_name: data.full_name || 'Not provided',
      phone: data.phone,
      email: data.email || null,
      rental_start_date: data.rental_start_date,
      rental_end_date: data.rental_end_date,
      delivery_location: data.delivery_location,
      number_of_carts: data.number_of_carts,
      cart_type: data.cart_type,
      preferred_contact_method: data.preferred_contact_method,
      best_time_to_call: data.best_time_to_call,
      notes: data.notes || null,
      understands_minimum: data.understands_minimum,
    }])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Database insert error:', error);
    throw error;
  }

  return result;
}
