# 🚨 URGENT FIX - Le Formulaire Ne Fonctionne Pas

## Le Problème

Quand tu cliques sur "Request Quote", tu vois "Something went wrong" parce que **Supabase bloque les insertions**.

## ✅ SOLUTION EN 2 MINUTES

### 1. Va sur Supabase

Ouvre ce lien EXACT:
```
https://supabase.com/dashboard/project/xntpcvnfijyuiitbbarg/editor
```

### 2. Ouvre le SQL Editor

Dans la sidebar à gauche, clique sur **SQL Editor** (icône <>)

### 3. Colle Ce Code

```sql
CREATE POLICY "Allow public quote submissions"
ON quote_requests
FOR INSERT
TO anon
WITH CHECK (true);
```

### 4. Clique "Run" (Ctrl + Enter)

Tu devrais voir: "Success. No rows returned"

---

## ✅ Vérification Rapide

Ouvre la page de test que j'ai créée:

```bash
open /Users/jcpl/Downloads/GolfCarts/test_form.html
```

Clique sur **"Test Database"**

Tu devrais voir:
```
✅ Database insert SUCCESS!
```

Si tu vois ça, le formulaire fonctionnera sur ton site!

---

## Si Ça Ne Marche TOUJOURS Pas

1. **Vérifie que la table existe:**
   - Va dans Table Editor
   - Cherche `quote_requests`
   - Si elle n'existe pas, crée-la

2. **Vérifie les policies:**
   - Va dans Authentication → Policies
   - Cherche `quote_requests`
   - Tu devrais voir: "Allow public quote submissions"

3. **Regarde les logs Supabase:**
   - Va dans Logs → Postgres Logs
   - Cherche "violates row-level security"

---

## Après Le Fix

Une fois la policy ajoutée:

1. **Rafraîchis ton site** (Cmd + R)
2. **Remplis le formulaire**
3. **Clique "Request Quote"**
4. **Tu devrais voir:** "Thank you — we'll contact you shortly"
5. **Dans le terminal:** Email preview dans les logs

---

## Besoin d'Aide Maintenant?

Envoie-moi un screenshot de:
1. La page Supabase Policies
2. Les logs Supabase
3. La console browser (F12 → Console) quand tu soumets le form

Je pourrai voir exactement ce qui bloque! 🔍
