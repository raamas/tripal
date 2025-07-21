import { Header } from "@/components/header";
import Link from "next/link";

export default function PaymentSucces({
  searchParams: { amount },
}: {
  searchParams: { amount: number };
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col m-auto items-center justify-center text-center min-h-[80vh]">
        <h2 className="font-bold text-4xl text-blue-700">
          Congrats. You've acquired the ${amount} USD plan
        </h2>
        <p className="font-light">
          Start{" "}
          <Link href={"/chat"} className=" text-blue-600">
            planning
          </Link>
        </p>
      </div>
    </div>
  );
}
