'use client'
import {NextUIProvider} from '@nextui-org/react';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <main
        className="
          w-screen overflow-hidden
          min-h-screen pb-10 
          dark text-foreground
          bg-background
        ">
        {children}
      </main>
    </NextUIProvider>
  )
}