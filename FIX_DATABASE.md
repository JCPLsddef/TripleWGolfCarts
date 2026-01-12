# 🔴 PROBLÈME IDENTIFIÉ - Row-Level Security Bloque les Insertions

## Le Problème

La table `quote_requests` a **Row-Level Security (RLS)** activé, mais **aucune policy** pour permettre les insertions publiques.

Résultat: Le formulaire échoue avec l'erreur:
```
"new row violates row-level security policy for table quote_requests"
```

---

## ✅ SOLUTION RAPIDE (5 minutes)

### Option 1: Via Supabase Dashboard (Plus Simple)

1. **Ouvre Supabase Dashboard:** https://supabase.com/dashboard
2. **Sélectionne ton projet:** xntpcvnfijyuiitbbarg
3. **Va dans:** Authentication → Policies
4. **Ou:** Table Editor → quote_requests → Policies
5. **Clique:** "New Policy"
6. **Configure:**
   - Policy name: `Allow public quote submissions`
   - Operation: `INSERT`
   - Target roles: `public` (ou `anon`)
   - WITH CHECK expression: `true`
7. **Clique:** "Save"

### Option 2: Via SQL Editor (Plus Rapide)

1. **Ouvre Supabase Dashboard:** https://supabase.com/dashboard
2. **Va dans:** SQL Editor
3. **Colle ce code:**

```sql
-- Create policy to allow anyone to insert quotes
CREATE POLICY "Allow public quote submissions"
ON quote_requests
FOR INSERT
TO anon
WITH CHECK (true);
```

4. **Clique:** "Run"

---

## 🧪 Vérifier Que Ça Fonctionne

Après avoir ajouté la policy:

1. **Teste depuis le terminal:**
```bash
node -e "
const url = 'https://xntpcvnfijyuiitbbarg.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhudHBjdm5maWp5dWlpdGJiYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Nzc1NjMsImV4cCI6MjA4MzQ1MzU2M30.QN_wPN-5HiJ3nxetaOx8IYJr_iLoxr_EAsmOETQ7A4o';

fetch(url + '/rest/v1/quote_requests', {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    full_name: 'Test User',
    phone: '555-1234',
    email: 'test@example.com',
    rental_start_date: '2026-01-15',
    rental_end_date: '2026-01-18',
    delivery_location: 'Test Location',
    number_of_carts: 2,
    cart_type: '4-Seater',
    preferred_contact_method: 'text',
    best_time_to_call: 'asap',
    understands_minimum: true
  })
})
.then(r => console.log('Status:', r.status, r.status === 201 ? '✅ SUCCESS' : '❌ FAILED'))
.catch(err => console.error('Error:', err));
"
```

2. **Tu devrais voir:** `Status: 201 ✅ SUCCESS`

3. **Teste le formulaire sur le site:**
   - Remplis le formulaire
   - Clique "Request Quote"
   - Tu devrais voir: "Thank you — we'll contact you shortly"

---

## 📊 Explication Technique

**Row-Level Security (RLS)** est une sécurité Postgres qui:
- ✅ Protège tes données (bien!)
- ❌ Bloque TOUT par défaut (incluant ton formulaire)

**Une Policy RLS** dit à Postgres:
> "Laisse les utilisateurs anonymes (`anon`) insérer (`INSERT`) dans cette table (`quote_requests`)"

Sans policy = Tout est bloqué = Formulaire échoue

Avec policy = Insertions autorisées = Formulaire fonctionne ✅

---

## 🔒 Sécurité

Cette policy est sûre car:
- ✅ Permet seulement INSERT (pas UPDATE/DELETE)
- ✅ N'expose pas les données existantes
- ✅ Standard pour les formulaires publics
- ✅ Utilisé par des milliers de sites

---

## 📞 Besoin d'Aide?

Si tu as des questions ou si ça ne fonctionne pas:
1. Vérifie que tu es dans le bon projet Supabase
2. Vérifie que la policy est bien créée (Authentication → Policies)
3. Regarde les logs Supabase pour voir les erreurs

Une fois la policy ajoutée, le formulaire fonctionnera immédiatement! 🚀
