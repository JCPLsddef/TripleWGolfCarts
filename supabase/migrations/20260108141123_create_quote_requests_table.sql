/*
  # Create Quote Requests Table for Triple W Rentals Golf Cart Rentals

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key) - Unique identifier for each quote request
      - `created_at` (timestamptz) - When the quote request was submitted
      - `full_name` (text) - Customer's full name
      - `phone` (text) - Customer's phone number
      - `email` (text) - Customer's email address (optional but needed for confirmation)
      - `rental_start_date` (date) - When the rental should begin
      - `rental_end_date` (date) - When the rental should end
      - `delivery_location` (text) - Where to deliver the golf cart(s)
      - `number_of_carts` (integer) - How many carts needed (1-10)
      - `cart_type` (text) - Standard 4-Seater, Luxury 4-Seater, or Not sure
      - `notes` (text) - Additional notes about the event or needs
      - `understands_minimum` (boolean) - Customer acknowledges 3-day minimum
      - `status` (text) - Quote request status for internal tracking
      - `email_sent` (boolean) - Whether confirmation email was sent

  2. Security
    - Enable RLS on `quote_requests` table
    - Add policy for anonymous users to insert quote requests (public form submission)
    - No read/update/delete policies for public (admin-only access)
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  rental_start_date date NOT NULL,
  rental_end_date date NOT NULL,
  delivery_location text NOT NULL,
  number_of_carts integer NOT NULL DEFAULT 1,
  cart_type text NOT NULL DEFAULT 'Not sure',
  notes text,
  understands_minimum boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  email_sent boolean NOT NULL DEFAULT false
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);
