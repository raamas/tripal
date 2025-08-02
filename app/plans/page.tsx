"use server";
import Header from "@/components/header";
import PlansList from "@/components/PlansList";

export default async function Plans() {
  return (
    <div className="min-h-screen bg-white flex flex-col w-full text-center  ">
      <Header />
      <h1 className="text-4xl font-bold text-blue-800 mb-4 mt-6">Plans</h1>
      <PlansList />
    </div>
  );
}
