# Scan de Achados — Landing

Landing estática de conversão para o grupo VIP no WhatsApp.  
Otimizada para anúncios Meta (Facebook/Instagram).

## Stack

- HTML + CSS + JS (sem framework)
- Deploy na **Vercel** como site estático
- Meta Pixel + evento `Lead` no clique do CTA

## Desenvolvimento local

```bash
npm run dev
# http://localhost:5173
```

## Deploy na Vercel

1. Importe este repositório no [Vercel](https://vercel.com/new)
2. Framework Preset: **Other**
3. Build Command: *(vazio)*
4. Output Directory: `.` *(raiz)*
5. Deploy

Ou pela CLI:

```bash
npx vercel --yes
```

## Domínio

Você pode usar este projeto **em paralelo** com `app.scandeachados.com` (outro projeto Vercel).

- `app.scandeachados.com` → app principal (não mexe)
- Landing → ex.: `scandeachados.com`, `www.scandeachados.com` ou `go.scandeachados.com`

Cada hostname aponta para **um** projeto só. Basta adicionar o domínio em **Project → Settings → Domains** do projeto da landing.

## WhatsApp

Link do grupo configurado em `script.js` (`WHATSAPP_URL`) e nos botões do `index.html`.

## Pixel

Meta Pixel ID: `2432035200645735`
