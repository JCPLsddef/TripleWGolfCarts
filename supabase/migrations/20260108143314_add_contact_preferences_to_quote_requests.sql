/*
  # Add Contact Preferences to Quote Requests

  1. Changes
    - Add `preferred_contact_method` column (call or text)
    - Add `best_time_to_call` column (asap, morning, afternoon, evening)
  
  2. Purpose
    - Help the sales team reach leads quickly using their preferred method
    - Reduce missed connections by calling at the right time
    - Improve lead qualification and conversion rates
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'preferred_contact_method'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN preferred_contact_method text DEFAULT 'call';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'best_time_to_call'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN best_time_to_call text DEFAULT 'asap';
  END IF;
END $$;
