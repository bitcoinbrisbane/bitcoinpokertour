"use client";
import Link from "next/link";
import { useState } from "react";
import { MenuExp, Classes } from "../../../types";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar";
import {
  RiCloseFill as CloseIcon,
  RiMenuLine as MenuIcon,
} from "react-icons/ri";
import { Dropdown } from "flowbite-react";

const navigation = ["Home", "Schedule", "Promotions", "Treasury", "Bitcoin Guide", "Contact"]

const NavLinks = ({ classes, menuExp, setMenuExpanded, closeMenu }: Classes & { closeMenu: () => void }) => {
  
  const handleLinkClick = () => {
    // Close the menu
    closeMenu();
  };
  return (
    <div className={`flex  ${classes}`}>
      {navigation.map((item, i) => (
        <div>
          {item}
        </div>
      ))}
    </div>
  );
};

const MobileNav = ({ menuExp, setMenuExpanded, closeMenu }: MenuExp & { closeMenu: () => void }) => {
  return (
    <div className="relative flex flex-col w-11/12 h-auto justify-center z-10">
      <div
        className={`flex flex-col p-6 absolute top-20 px-8 w-full rounded-xl transition duration-200`}
      >
        <ul className="list-none flex items-start flex-1 flex-col">
         { <NavLinks
            classes="flex-col font-bold"
            menuExp={menuExp}
            setMenuExpanded={setMenuExpanded}
            closeMenu={closeMenu}
          /> }
        </ul>
      </div>
    </div>
  );
};

const Menu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  
  return (
    <Menubar className="flex flex-col mb-32 md:flex-row bg-white border-b border-gray-200">
      <MenubarMenu>
        {
          navigation.map((name, idx) => (
            <MenubarTrigger key={idx} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
              {name}
            </MenubarTrigger>
          ))
        }
      </MenubarMenu>
    </Menubar>
  )
};



export default Menu;
