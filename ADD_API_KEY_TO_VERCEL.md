# 🔑 Add RESEND_API_KEY to Vercel (CRITICAL STEP)

## ⚠️ THE PROBLEM

The form is returning 500 error because `RESEND_API_KEY` is not set in Vercel's production environment.

**Your API Key**: `re_JuD66Zrs_3C7h3kXJS7ipLb1DB41RS3sp`

---

## ✅ SOLUTION: Add Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard

**Direct Link**: https://vercel.com/dashboard

### Step 2: Select Your Project

Click on: **triple-w-golf-carts**

### Step 3: Go to Settings

Click **"Settings"** in the top navigation bar

### Step 4: Environment Variables

1. In the left sidebar, click **"Environment Variables"**
2. Click **"Add New"** button (top right)

### Step 5: Add the Variable

Fill in these EXACT values:

```
Name (Key):
RESEND_API_KEY

Value:
re_JuD66Zrs_3C7h3kXJS7ipLb1DB41RS3sp

Environments:
☑️ Production
☑️ Preview
☑️ Development
```

**Make sure ALL THREE checkboxes are checked!**

### Step 6: Save

Click **"Save"** button

You should see the variable appear in the list:
```
RESEND_API_KEY    ***...sp    Production, Preview, Development
```

### Step 7: Redeploy (CRITICAL)

Environment variables only take effect after redeployment:

1. Go to **"Deployments"** tab
2. Find the **latest deployment** (at the top)
3. Click the **three dots "..."** on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. Wait for deployment to complete (~1-2 minutes)

---

## ✅ Verify It Worked

Once redeployment completes:

### Test 1: Submit Form
1. Visit: https://triple-w-golf-carts.vercel.app
2. Fill out the quote form
3. Click "Request Quote"
4. Should see: **"Thank you — we'll contact you shortly"** ✅

### Test 2: Check Emails
**Both addresses should receive the email:**
- ✉️ `jcpl-07@hotmail.com`
- ✉️ `Triplewrentals@gmail.com`

### Test 3: Check Logs
1. Vercel Dashboard → Deployments → Latest → Functions
2. Click `/api/send-lead`
3. Should see:
   ```
   - RESEND_API_KEY exists: true ✅
   - RESEND_API_KEY starts with "re_": true ✅
   - Test mode: false ✅
   ✅ Email sent successfully via Resend!
   ```

---

## 🎯 Expected Result

**Before (Current)**:
```
❌ Failed to load resource: 500
❌ SUBMISSION FAILED
```

**After (Fixed)**:
```
✅ LEAD NOTIFICATION SENT!
✅ Email sent to both addresses
✅ Success message displayed
```

---

## 🔒 Security Note

**IMPORTANT**:
- The `.env` file is in `.gitignore` (not committed to GitHub)
- Your API key is only stored in Vercel's secure environment
- Never share your API key publicly
- If compromised, regenerate it at https://resend.com/api-keys

---

## 💡 Troubleshooting

### If still getting 500 after redeployment:

1. **Verify variable name is EXACT**: `RESEND_API_KEY` (case-sensitive)
2. **Verify value starts with**: `re_` (no extra spaces)
3. **Verify Production is checked**: Must be enabled for production
4. **Wait 2-3 minutes**: Environment changes take time to propagate
5. **Hard refresh browser**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### If emails not received:

1. **Check spam/junk folders** in both inboxes
2. **Check Resend dashboard**: https://resend.com/logs
3. **Verify account**: Make sure Resend account is verified

---

## 📞 Need Help?

If you're stuck, send me a screenshot of:
1. Vercel Environment Variables page (showing RESEND_API_KEY exists)
2. Vercel Function Logs (after submitting form)

Once the environment variable is added and redeployed, emails will work! 🚀
