"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>PetSoft access requires payment</H1>

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            //start transition
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}
      {searchParams?.success && (
        <p className="text-md text-green-500">
          Payment Successful.You can now access the app.
        </p>
      )}
      {searchParams?.canceled && (
        <p className="text-md text-red-500">
          Payment canceled. Please try again.
        </p>
      )}
    </main>
  );
}
