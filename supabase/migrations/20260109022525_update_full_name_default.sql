/*
  # Update full_name column default value

  1. Changes
    - Set default value for `full_name` column to 'Not provided'
    - This allows form submissions where name is optional (Step 2 of progressive form)
  
  2. Purpose
    - Support the new 2-step progressive form where name is optional
    - Reduce form friction by making name a Step 2 field
*/

ALTER TABLE quote_requests
ALTER COLUMN full_name SET DEFAULT 'Not provided';
