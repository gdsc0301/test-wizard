'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { LinkedIn, NoteAlt } from "@mui/icons-material";
import Image from "next/image";

import logo from '../../../public/logo.png';

function Header() {
  return (
    <Navbar as={'header'} isBordered position="sticky" className="print:hidden" maxWidth="2xl">
      <NavbarBrand>
        <Image src={logo} alt="Provinha Logo" width={40} height={40} className="mr-4" />
        <h1 className="font-bold text-inherit">Provinha 💫✨</h1>
      </NavbarBrand>
      <NavbarContent justify="center" className="max-sm:hidden">
        <h2>seu editor de provas gratuito, rápido e completo! 🚀</h2>
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