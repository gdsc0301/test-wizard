'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import Image from "next/image";
import { LinkedIn, NoteAlt } from "@mui/icons-material";

function Header() {
  return (
    <Navbar as={'header'} isBordered position="sticky" className="print:hidden" maxWidth="2xl">
      <NavbarBrand>
        <NoteAlt className="text-amber-500 text-4xl mr-3 animate-pulse" />
        <h1 className="font-bold text-inherit">Gerador de Prova 💫✨</h1>
      </NavbarBrand>
      <NavbarContent justify="center" className="max-sm:hidden">
        <h2>seu gerador de provas rápido e completo! 🚀</h2>
      </NavbarContent>
      <NavbarContent justify="end">
        <a href="https://www.linkedin.com/in/guilherme-c/" target="_blank" rel="noopener noreferrer">
          <LinkedIn /> Contate-me
        </a>
      </NavbarContent>
    </Navbar>
  )
}

export default Header;