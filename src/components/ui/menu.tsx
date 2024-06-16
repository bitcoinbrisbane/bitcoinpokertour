"use client";
import Link from "next/link";
import { useState } from "react";
import { MenuExp, Classes } from "../../../types";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar";
import {
  RiCloseFill as CloseIcon,
  RiMenuLine as MenuIcon,
} from "react-icons/ri";
import { Icon } from "./icon";

const navigation = ["Home", "Schedule", "Promotions", "Treasury", "Bitcoin Guide", "Contact"]

const NavLinks = ({ classes, menuExp, setMenuExpanded, closeMenu }: Classes & { closeMenu: () => void }) => {

  const handleLinkClick = () => {
    // Close the menu
    closeMenu();
  };
  return (
    <div className={`flex ${classes} space-y-2`}>
      {navigation.map((item, i) => (
        <div key={item + i}>
          {item}
        </div>
      ))}
    </div>
  );
};

const MobileNav = ({ menuExp, setMenuExpanded, closeMenu }: MenuExp & { closeMenu: () => void }) => {
  return (
    <div className="absolute flex flex-col w-3/4 shadow h-auto justify-center z-10 ">
      {/* Menu */}
      <div
        className={`${menuExp ? "flex" : "hidden"} shadow flex-col p-6 absolute top-1 px-8 w-3/4 ml-11 rounded-xl transition duration-500 bg-white`}
      >
        <ul className="list-none flex items-start flex-1 flex-col space-y-1">
          <NavLinks classes="font-bold flex-col" menuExp={menuExp} setMenuExpanded={setMenuExpanded} closeMenu={closeMenu} />
        </ul>
      </div>
    </div>
  );
};

const Menu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <div>
      <div className="flex w-auto md:invisible justify-center hover:cursor-pointer p-5">
        <Icon
          className="transition duration-100"
          size={25}
          icon={menuExpanded ? CloseIcon : MenuIcon}
          onClick={() => setMenuExpanded(!menuExpanded)}
        />
      </div>
      {menuExpanded && (
        <div className="flex justify-center ">
          <MobileNav menuExp={menuExpanded} setMenuExpanded={setMenuExpanded} closeMenu={() => { }} />
        </div>
      )}
      <Menubar className="sm:invisible md:visible flex flex-row mb-10 bg-white border-b border-gray-200">
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

    </div>
  )
};

export default Menu;