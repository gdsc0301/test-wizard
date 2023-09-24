'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import { LinkedIn, NoteAlt } from "@mui/icons-material";

function Header() {
  return (
    <Navbar isBordered position="sticky" className="print:hidden">
      <NavbarBrand>
        <NoteAlt className="text-amber-500 text-4xl mr-3 animate-pulse" />
        <h1 className="font-bold text-inherit">Test Wizard 💫✨</h1>
      </NavbarBrand>
      <NavbarContent justify="center" className="max-sm:hidden">
        <h2>your all-in-one, lightning-fast test generator! 🚀</h2>
      </NavbarContent>
      <NavbarContent justify="end">
        <a href="https://www.linkedin.com/in/guilherme-c/" target="_blank" rel="noopener noreferrer">
          <LinkedIn /> Contato
        </a>
      </NavbarContent>
    </Navbar>
  )
}

export default Header;