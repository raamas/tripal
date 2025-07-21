"use client";
import CheckoutPage from "@/components/stripe/CheckoutPage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode, useState } from "react";
import React from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
export default function Payment() {
  const plans = [
    {
      id: 0,
      title: "anual",
      price: 10,
      description: `✈️ Annual Plan – For the Frequent Explorer
Unlimited AI-generated itineraries all year

Priority access to premium features and exclusive deals

Personalized destination insights and travel tips

Early access to new app features & upgrades

VIP customer support — faster responses, 24/7

Save up to 30% compared to monthly plan

One payment, a year of smarter travel.`,
    },
    {
      id: 1,
      title: "monthly",
      price: 1,
      description: `.

🗓️ Monthly Plan – Flexibility for Occasional Travelers
Full access to AI travel planner features

Unlimited itineraries and trip suggestions

On-demand support whenever you travel

Cancel anytime — no long-term commitment

Perfect for short-term trips or spontaneous getaways.`,
    },
  ];

  const [plan, setPlan] = useState<{
    id: number;
    title: string;
    price: number;
    description: string;
  }>(plans[0]);

  const copy = {
    heading: "Unlock Smarter Travel with Tripal",
    desc: `Let AI craft your perfect trip - from custom itineraries to real-time updates.\n
Subscribe now for priority access to:\n
✅ Personalized travel plans\n
✅ Instant booking options\n
✅ 24/7 AI-powered support\n
✅ Exclusive travel deals\n

Your next adventure starts here.\n

[Subscribe Now]`,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col w-full text-center p-6 ">
      <h2 className="text-4xl font-bold m-8 text-blue-800">{copy.heading}</h2>
      <p className="mb-12 mx-12">
        {copy.desc.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < copy.desc.split("\n").length - 1 && <br />}{" "}
            {/* Add <br /> for all but the last line */}
          </React.Fragment>
        ))}
      </p>

      <div className="w-full flex flex-col md:flex-row items-center justify-center p-4 gap-4">
        {plans.map((p, i) => (
          <Card
            className="w-full flex flex-col hover:cursor-pointer"
            key={i}
            role="button"
            onClick={() => setPlan(plans[i])}
          >
            <CardHeader
              className={
                " text-2xl " + (p.id == plan.id && "text-blue-800 font-bold ")
              }
            >
              {p.title}
            </CardHeader>
            <CardContent className="flex flex-col">
              <h3>${p.price} USD / Month</h3>
              <p className={p.id == plan.id ? "block" : "hidden"}>
                {p.description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < p.description.split("\n").length - 1 && (
                      <br />
                    )}{" "}
                    {/* Add <br /> for all but the last line */}
                  </React.Fragment>
                ))}
              </p>
              {p.id == plan.id && (
                <p className="text-blue-700 font-bold text-sm mt-2">
                  You chose {p.title}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: Math.round(plan.price * 100),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={plan.price} />
      </Elements>
    </div>
  );
}
