import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "egp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return new NextResponse(
    JSON.stringify({ clientSecret: paymentIntent.client_secret })
  );
}
