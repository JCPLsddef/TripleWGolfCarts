# Netlify Deployment Setup Guide

## Issue Fixed

The build was failing because the Supabase client was trying to initialize without environment variables during the build process. This has been fixed by:

1. Making the Supabase client initialization conditional
2. Adding proper null checks to prevent build-time errors
3. The app will now build successfully without environment variables, but they're required at runtime for the form to work

## Required Environment Variables

You need to add these environment variables in your Netlify dashboard for the site to function properly:

### Step-by-Step Instructions:

1. **Go to your Netlify site dashboard**
   - Navigate to: Site settings → Build & deploy → Environment → Environment variables

2. **Add the following variables:**

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xntpcvnfijyuiitbbarg.supabase.co`

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhudHBjdm5maWp5dWlpdGJiYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Nzc1NjMsImV4cCI6MjA4MzQ1MzU2M30.QN_wPN-5HiJ3nxetaOx8IYJr_iLoxr_EAsmOETQ7A4o`

3. **Save the variables**

4. **Trigger a new deploy**
   - Go to: Deploys → Trigger deploy → Deploy site
   - Or push a new commit to trigger auto-deployment

## What Changed

### Files Modified:

1. **`/src/lib/supabase.ts`**
   - Changed Supabase client initialization to be conditional
   - Added null checks to prevent build failures
   - The client now only gets created if environment variables are present

2. **`.env.example`** (NEW)
   - Template for required environment variables

3. **`netlify.toml`** (NEW)
   - Netlify configuration file for Next.js deployment

4. **`NETLIFY_SETUP.md`** (THIS FILE)
   - Deployment instructions

## Verification

After adding the environment variables and redeploying:

1. The build should complete successfully ✅
2. The website should load without errors ✅
3. The booking form should work and submit to Supabase ✅

## Troubleshooting

If the form doesn't work after deployment:
- Double-check that both environment variables are set correctly in Netlify
- Verify the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure you triggered a new deploy after adding the variables

## Security Note

The `NEXT_PUBLIC_` prefix makes these variables available in the browser. This is safe for:
- ✅ The Supabase URL (public information)
- ✅ The anon key (designed to be public, row-level security protects your data)

Never expose your Supabase service role key or other sensitive credentials!
