export default function PaymentSucces({
  searchParams: { amount },
}: {
  searchParams: { amount: number };
}) {
  return <p>Paid ${amount} USD</p>;
}
