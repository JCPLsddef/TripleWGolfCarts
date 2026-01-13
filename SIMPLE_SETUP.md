# 🚀 Simple Lead Capture System

**NO DATABASE • NO SUPABASE • JUST EMAIL NOTIFICATIONS**

## How It Works

1. User fills out quote form on website
2. Form submits to Vercel API Route (`/api/send-lead`)
3. API sends ONE email to both admin addresses
4. User sees confirmation: "Thank you — we'll contact you shortly"

**That's it. Maximum simplicity.**

---

## ✅ Current Status

- **Form**: ✅ Working perfectly
- **Calendar**: ✅ Full-width date range picker with 3-day validation
- **Email API**: ✅ Ready (currently in test mode)
- **Database**: ❌ REMOVED (not needed)
- **Supabase**: ❌ REMOVED (not needed)

---

## 🧪 Test It Now (Development)

```bash
npm run dev
```

Open http://localhost:3000 and fill out the quote form.

**In test mode**, you'll see the email logged to the terminal:
```
========================================
📧 EMAIL TEST MODE (Resend not configured)
========================================
FROM: Website Leads <leads@triplewrentals.com>
TO: jcpl-07@hotmail.com, Triplewrentals@gmail.com
SUBJECT: New Lead – Website (John Doe - 2 carts)
...
```

Form will show success message even in test mode.

---

## 🔑 Production Setup (Send Real Emails)

### Step 1: Get Resend API Key

1. Go to https://resend.com
2. Sign up / Log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### Step 2: Add to Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select project: `triple-w-golf-carts`
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Set:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
6. Click **Save**
7. **Redeploy**: Go to Deployments → Latest → Click "..." → Redeploy

### Step 3: Test Production

1. Visit your live site: https://triple-w-golf-carts.vercel.app
2. Fill out the quote form
3. Click "Request Quote"
4. You should see: "Thank you — we'll contact you shortly"
5. Check your email: `jcpl-07@hotmail.com`
6. Check backup email: `Triplewrentals@gmail.com`

**Both emails will receive the same lead notification with:**
- Customer name, phone, email
- Rental dates and location
- Number of carts and type
- Special notes

---

## 📧 Email Details

**FROM**: `Website Leads <leads@triplewrentals.com>`
**TO**: `jcpl-07@hotmail.com`, `Triplewrentals@gmail.com`
**SUBJECT**: `New Lead – Website ([Name] - [X] carts)`
**REPLY-TO**: Customer email (if provided)

**Email includes:**
- Customer contact information
- Rental dates and location
- Number of carts and type
- Special requests/notes
- Clear call-to-action

---

## 🏗️ Architecture

```
User submits form
    ↓
QuoteForm.tsx (Frontend)
    ↓
POST to /api/send-lead (Vercel Serverless Function)
    ↓
Check RESEND_API_KEY
    ↓
Test mode?          Production mode?
    ↓                      ↓
Console log           Resend API
    ↓                      ↓
Success response      Email sent to admins
```

**NO DATABASE • NO EXTERNAL SERVICES • JUST EMAIL**

---

## 📁 Files

### Core Files
- `src/components/sections/QuoteForm.tsx` - Form component (calls API directly)
- `src/app/api/send-lead/route.ts` - Vercel API route (sends emails)
- `.env` - Environment variables (local development)

### Deprecated Files (no longer used)
- `src/lib/supabase.ts` - Database client (NOT USED)
- `FIX_DATABASE.md` - RLS fix guide (OBSOLETE)
- `URGENT_FIX.md` - Database fix (OBSOLETE)
- `supabase_rls_fix.sql` - SQL script (OBSOLETE)

---

## 🔧 Troubleshooting

### "Something went wrong"?

**Check browser console (F12):**
- If you see "✅ LEAD NOTIFICATION SENT!" → Form worked, email sent
- If you see "❌ SUBMISSION FAILED" → Check error message

**Check terminal logs (dev server):**
- Should see "📧 EMAIL TEST MODE" or "✅ Email sent successfully"

**Still not working?**

1. Restart dev server: `npm run dev`
2. Clear browser cache: Cmd/Ctrl + Shift + R
3. Check `.env` file has `RESEND_API_KEY=test_mode`
4. Check terminal for detailed error messages

### No emails in production?

1. **Verify Vercel environment variable:**
   - Dashboard → Settings → Environment Variables
   - `RESEND_API_KEY` should start with `re_`

2. **Check Vercel function logs:**
   - Dashboard → Deployments → Select deployment → Functions
   - Look for `/api/send-lead` logs

3. **Check Resend dashboard:**
   - https://resend.com/logs
   - See if emails were sent and delivery status

4. **Check spam folder** in both email inboxes

5. **Redeploy after adding environment variable:**
   - Environment variables require redeploy to take effect

---

## ✨ Features

- ✅ **No database** - Zero infrastructure to manage
- ✅ **Test mode** - Develop without API key
- ✅ **Dual notifications** - Both admins get the same email
- ✅ **Production-ready** - Works on Vercel out of the box
- ✅ **Beautiful calendar** - Premium date picker with validation
- ✅ **Form validation** - Client-side with helpful error messages
- ✅ **Mobile-optimized** - Perfect on all screen sizes
- ✅ **Fast** - Serverless functions respond instantly

---

## 🚀 Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "Simplify to email-only lead capture"

# Push to GitHub
git push origin main
```

Vercel will auto-deploy from your GitHub repository.

**After deployment:**
1. Add `RESEND_API_KEY` environment variable
2. Redeploy
3. Test form on live site

---

## 📞 Support

- **Resend Docs**: https://resend.com/docs
- **Resend Status**: https://status.resend.com
- **Vercel Docs**: https://vercel.com/docs

---

## 🎯 Success Checklist

- [ ] `npm run dev` works locally
- [ ] Form submission shows success message
- [ ] Terminal shows email test logs
- [ ] Resend API key added to Vercel
- [ ] Production deployment successful
- [ ] Form works on live site
- [ ] Emails received at both addresses
- [ ] Email contains all lead details

**Once all checked, you're done! 🎉**
