const stripe = require("stripe")(process.env.STRIPE_SECRET!);
export async function POST(request: Request) {
  try {
    const { amount }: { amount: number } = await request.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    return Response.json({
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    return Response.json({ status: 500, message: "internal server error" });
  }
}
