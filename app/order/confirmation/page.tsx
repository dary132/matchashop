import { ConfirmationView } from "@/components/ConfirmationView";

export const metadata = { title: "Order confirmed — Kuroha" };
export const dynamic = "force-dynamic";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { session_id?: string; mock?: string };
}) {
  return (
    <ConfirmationView
      sessionId={searchParams.session_id}
      isMock={searchParams.mock === "1"}
    />
  );
}
