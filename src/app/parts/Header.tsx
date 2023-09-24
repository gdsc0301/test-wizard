'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import { NoteAlt } from "@mui/icons-material";

function Header() {
  return (
    <Navbar isBordered position="sticky" className="print:hidden">
      <NavbarBrand>
        <NoteAlt className="text-amber-500 text-4xl mr-3 animate-pulse" />
        <p className="font-bold text-inherit">Test Generator</p>
      </NavbarBrand>
      <NavbarContent>

      </NavbarContent>
    </Navbar>
  )
}

export default Header;