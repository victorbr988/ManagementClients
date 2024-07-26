"use client";

import { ModalCreateClient } from "@/components/custom/dialog";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <p>Carregando mapa...</p>,
      ssr: false
    }
  ), [])

  return (
    <main className="flex min-h-screen flex-col">
      <header className="p-4 absolute top-0 left-10 right-0 z-[9999] flex items-center gap-4">
        <ModalCreateClient />
      </header>
      <div className="h-full w-full">
        <Map />
      </div>
    </main>
  );
}
