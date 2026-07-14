# Doações via Stripe — migrar depois

Estas duas funções rodavam como Serverless Functions (Deno) dentro do base44.
Quando formos migrar o Stripe, a ideia é recriá-las como Supabase Edge
Functions (também rodam em Deno, então a conversão é praticamente 1:1):

- `functions/create-donation-checkout/entry.ts` — cria a sessão de checkout do Stripe
- `functions/stripe-webhook/entry.ts` — recebe a confirmação de pagamento

Principais trocas necessárias:
- `Deno.env.get("STRIPE_SECRET_KEY")` e `STRIPE_WEBHOOK_SECRET` viram
  Secrets configurados no projeto Supabase (`supabase secrets set`)
- Remover a referência a `BASE44_APP_ID` nos metadados da sessão
- `origin || 'https://app.base44.com'` precisa apontar pro domínio real do
  site
