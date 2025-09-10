'use client'
import {HeroUIProvider} from "@heroui/react";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <main
        className="
          antialiased
          w-screen overflow-hidden
          min-h-screen pb-10 
          dark text-foreground
          bg-background
        ">
        {children}
      </main>
    </HeroUIProvider>
  )
}