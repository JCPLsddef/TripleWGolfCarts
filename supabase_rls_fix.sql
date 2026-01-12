-- Fix for quote_requests table RLS policy
-- This allows public form submissions to insert into the table

-- Enable RLS if not already enabled
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing insert policy if any
DROP POLICY IF EXISTS "Allow public quote submissions" ON quote_requests;

-- Create policy to allow anyone to insert quotes
CREATE POLICY "Allow public quote submissions"
ON quote_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Optional: Allow reading own quotes (if you want users to see confirmation)
DROP POLICY IF EXISTS "Allow reading all quotes" ON quote_requests;
CREATE POLICY "Allow reading all quotes"
ON quote_requests
FOR SELECT
TO public
USING (true);
