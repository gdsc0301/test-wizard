'use client'

import Header from './parts/Header'
import TestGenerator from './parts/TestGenerator'
import Image from 'next/image'

import { NextUIProvider } from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <Header />
      <TestGenerator />
    </NextUIProvider>
  )
}
