import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Math.round(amount * 100) }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data: ", data);
        setClientSecret(data.client_secret);
      });
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?amount=${amount}`,
      },
    });

    if (paymentError) {
      setErrorMessage(paymentError.message);
      setLoading(false);
      return;
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full">
        {!errorMessage && !clientSecret && (
          <p className="animate-pulse font-bold text-blue-800">Loading...</p>
        )}
        {clientSecret && <PaymentElement />}
        {errorMessage && <p>{errorMessage}</p>}
        <Button className="w-full bg-blue-800 hover:bg-blue-950 mt-4">
          Pay ${amount} USD
        </Button>
      </form>
    </div>
  );
}
