"use server";

import React from "react";
import PaymentInfo from "@/components/PaymentInfo";

export default async function Payment({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { plan } = await searchParams;

  const copy = {
    heading: "Unlock Smarter Travel with Tripal",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col w-full text-center p-6 ">
      <h2 className="text-4xl font-bold m-8 text-blue-800">{copy.heading}</h2>

      <PaymentInfo planId={plan! as string} />
    </div>
  );
}
