"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./stripe/CheckoutPage";
import { Plan } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function PaymentInfo({ planId }: { planId: string }) {
  const [plan, setPlan] = useState<Plan>();
  const [devMessage, setDevMessage] = useState({ type: "info", text: "" });
  useEffect(() => {
    const getPlanInfo = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("plans")
        .select()
        .eq("id", planId)
        .single();
      if (error || !data) {
        setDevMessage({
          type: "error",
          text: error
            ? error.message
            : "Unknown Error. Could Not Get Subscription Plan Info",
        });
      }
      setPlan(data);
    };
    getPlanInfo();
  }, [planId]);
  return (
    <>
      {devMessage.type === "error" && (
        <h2 className="text-2xl font-bold text-red-800">{devMessage.text}</h2>
      )}
      {plan && (
        <div className="w-full flex flex-col md:flex-row items-center justify-center p-2 gap-4">
          <Card className="w-full flex flex-col overflow-hidden justify-around shadow-none">
            <CardHeader className=" text-2xl text-blue-800 font-bold ">
              {plan.title}
            </CardHeader>
            <CardContent className="flex flex-col">
              <h3 className="font-semibold">
                ${plan.price} USD / {plan.title === "Annual" ? "year" : "month"}
              </h3>
            </CardContent>
          </Card>

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
      )}
    </>
  );
}
