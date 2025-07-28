"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Plan } from "@/lib/utils";
import Link from "next/link";

const getPlans = async (): Promise<Plan[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("plans").select();
  if (error || !data) {
    return [{ title: "No Subscription Plans" } as Plan];
  }
  return data;
};

export default function PlansList() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const wrapGetPlans = async () => {
      const response = await getPlans();
      setPlans(response);
    };

    wrapGetPlans();
  }, []);
  return (
    <div className="flex gap-3 flex-col p-4 max-w-lg self-center mb-4">
      {plans.map((plan) => (
        <Card
          className="w-full flex flex-col min-h-[40vh] overflow-hidden justify-around shadow-none"
          key={plan.id}
        >
          <CardHeader className=" text-2xl text-blue-800 font-bold hover:scale-110 hover:text-blue-900">
            <Link href={"/payment?plan=" + plan.id}>{plan.title}</Link>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="md:block block">
              {plan.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < plan.description.split("\n").length - 1 && (
                    <br />
                  )}{" "}
                </React.Fragment>
              ))}
            </p>

            <h3 className="font-semibold text-lg mt-2">
              $ {plan.price} USD / {plan.title === "Annual" ? "year" : "month"}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
