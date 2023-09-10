import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Image from "next/image";

function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Image src="/ja.svg" alt="JA" width={72} height={80} className="mr-3" />
        <p className="font-bold text-inherit">Test Generator</p>
      </NavbarBrand>
      <NavbarContent>

      </NavbarContent>
    </Navbar>
  )
}

export default Header;