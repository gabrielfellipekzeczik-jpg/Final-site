import Stripe from 'npm:stripe@17.7.0';

Deno.serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!signature || !secret) {
      return Response.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    const event = await stripe.webhooks.constructEventAsync(body, signature, secret);

    console.log(`Received Stripe event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Donation completed:', {
        amount: session.amount_total,
        type: session.metadata?.donation_type,
        customer_email: session.customer_details?.email,
      });
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});