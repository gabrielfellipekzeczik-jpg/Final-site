import Stripe from 'npm:stripe@17.7.0';

Deno.serve(async (req) => {
  try {
    const { amount, type } = await req.json();

    if (!amount || amount < 5) {
      return Response.json({ error: 'Valor mínimo de doação é R$ 5,00' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
    const origin = req.headers.get('origin') || 'https://app.base44.com';
    const isMonthly = type === 'monthly';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: isMonthly
              ? 'Apoiador Mensal — Transformadas para Transformar'
              : 'Doação — Transformadas para Transformar',
          },
          unit_amount: Math.round(amount * 100),
          ...(isMonthly ? { recurring: { interval: 'month' } } : {}),
        },
        quantity: 1,
      }],
      mode: isMonthly ? 'subscription' : 'payment',
      success_url: `${origin}/?donation=success`,
      cancel_url: `${origin}/?donation=cancelled`,
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
        donation_type: isMonthly ? 'monthly' : 'one_time',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});