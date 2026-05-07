"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const BookingFlow = dynamic(() => import("@/components/booking/BookingFlow"), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Carregando...</div>,
});

export default function BookingPageClient() {
  const params = useSearchParams();
  const unidade = params.get("unidade") ?? undefined;
  const servico = params.get("servico") ?? undefined;
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Carregando...</div>}>
      <BookingFlow initialUnidade={unidade} initialServico={servico} />
    </Suspense>
  );
}
