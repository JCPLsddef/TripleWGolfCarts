# Email Notification Setup

## Current Status

✅ **Form works without setup** - Test mode is enabled by default
⚠️ **No actual emails sent** - Only console logs
🎯 **Ready for production** - Just add Resend API key

---

## Test Mode (Current)

The form currently works in **TEST MODE**:
- ✅ Form submission succeeds
- ✅ Confirmation message shows
- ✅ Data saved to database
- ✅ Email details logged to console
- ❌ NO actual emails sent

**Console Output Example:**
```
========================================
📧 EMAIL TEST MODE (Resend not configured)
========================================
FROM: Website Leads <leads@triplewrentals.com>
TO: jcpl-07@hotmail.com, Triplewrentals@gmail.com
SUBJECT: New Lead – Website (John Doe - 2 carts)
...
```

---

## Production Setup (Send Real Emails)

To send actual emails to `jcpl-07@hotmail.com` and `Triplewrentals@gmail.com`:

### 1. Get Resend API Key

1. Go to https://resend.com
2. Sign up / Log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### 2. Configure Locally (Development)

Update `.env` file:
```bash
# Replace test_mode with your real API key
RESEND_API_KEY=re_your_actual_api_key_here
```

Restart dev server:
```bash
npm run dev
```

### 3. Configure on Vercel (Production)

1. Go to Vercel Dashboard
2. Select your project: `triple-w-golf-carts`
3. Go to **Settings** → **Environment Variables**
4. Add variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_api_key_here`
   - **Environments:** Production, Preview, Development
5. Click **Save**
6. Redeploy: `git push origin main`

### 4. Configure Sending Domain (Optional but Recommended)

**Option A - Use Resend Domain (Easiest)**
- Works immediately
- FROM: `Website Leads <leads@onboarding.resend.dev>`
- May have deliverability limits

**Option B - Use Your Domain (Best for Production)**
1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Enter: `triplewrentals.com`
4. Add DNS records to your domain:
   ```
   Type    Name              Value
   TXT     @                 [verification token]
   CNAME   resend._domainkey [DKIM value]
   ```
5. Wait for verification (5-30 minutes)
6. Update API route FROM address:
   ```typescript
   from: 'Website Leads <leads@triplewrentals.com>'
   ```

---

## Email Details

**FROM:** `Website Leads <leads@triplewrentals.com>`
**TO:** `jcpl-07@hotmail.com`, `Triplewrentals@gmail.com`
**SUBJECT:** `New Lead – Website ([Name] - [X] carts)`
**REPLY-TO:** Customer email (if provided)

**Email includes:**
- Customer name, phone, email
- Rental dates and location
- Number of carts and type
- Special requests/notes
- Clear call-to-action

---

## Testing

### Test in Development
```bash
npm run dev
# Open http://localhost:3000
# Fill out quote form
# Check terminal for email logs
```

### Test in Production
1. Submit form on live site
2. Check your email: `jcpl-07@hotmail.com`
3. Check backup email: `Triplewrentals@gmail.com`
4. Verify all lead data is included

---

## Troubleshooting

### No emails received?

1. **Check API key is set:**
   ```bash
   # Vercel: Dashboard → Settings → Environment Variables
   # Local: check .env file
   ```

2. **Check Vercel logs:**
   ```bash
   # Vercel Dashboard → Deployments → Select deployment → Functions
   # Look for "✅ Email sent successfully" or errors
   ```

3. **Check spam folder**

4. **Verify Resend dashboard:**
   - Go to Resend → Logs
   - Check if emails were sent
   - Check delivery status

### Still in test mode?

- Make sure `RESEND_API_KEY` starts with `re_` (not `test_mode`)
- Restart dev server after changing .env
- Redeploy on Vercel after changing environment variables

---

## Architecture

```
User submits form
    ↓
QuoteForm.tsx (Frontend)
    ↓
submitQuoteRequest() in supabase.ts
    ↓
1. Insert to Supabase database
2. POST to /api/send-lead
    ↓
/api/send-lead/route.ts (Serverless API)
    ↓
Check RESEND_API_KEY
    ↓
Test mode?          Production mode?
    ↓                      ↓
Console log           Resend API
    ↓                      ↓
Success response      Email sent to admins
```

---

## Security Notes

- ✅ FROM address controlled by us (not user input)
- ✅ NO customer confirmation emails (only admin notifications)
- ✅ API key stored securely in environment variables
- ✅ Rate limiting handled by Vercel
- ✅ Input validation on API route

---

## Support

- **Resend Docs:** https://resend.com/docs
- **Resend API Status:** https://status.resend.com
- **Need help?** Check Vercel logs or Resend dashboard for errors
