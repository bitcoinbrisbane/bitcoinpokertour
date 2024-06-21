"use client";
import Link from "next/link";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar";
import { useEffect, useState } from "react";
import { MenuExp, Classes } from "../../types";
import {
  RiCloseFill as CloseIcon,
  RiMenuLine as MenuIcon,
} from "react-icons/ri";
import { Icon } from "./Icon";
import { navigation } from "@/constansts/constants";

const NavLinks = ({ classes, menuExp, setMenuExpanded, closeMenu }: Classes & { closeMenu: () => void }) => {

  const handleLinkClick = () => {
    // Close the menu
    closeMenu();
  };
  return (
    <div className={`flex ${classes} space-y-2`}>
      {navigation.map((item, i) => (
        <div key={item.name + i}>
          <Link href={item.url} onClick={() => setMenuExpanded(!menuExp)}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

const MobileNav = ({ menuExp, setMenuExpanded, closeMenu }: MenuExp & { closeMenu: () => void }) => {
  const [windowsWidth, setWindows] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindows(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowsWidth])

    const midScreen = 830;

  if (menuExp && windowsWidth > midScreen) setMenuExpanded(false)

  return (
    <div className="absolute flex flex-col w-3/4 shadow h-auto justify-center z-10">
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
    <div className={`${menuExpanded ? "mb-44 pb-16" : "pb-7"} `}>
      <div className="flex w-auto md:invisible justify-center hover:cursor-pointer p-1">
        <Icon
          className="transition duration-100"
          size={25}
          icon={menuExpanded ? CloseIcon : MenuIcon}
          onClick={() => setMenuExpanded(!menuExpanded)}
        />
      </div>
      {menuExpanded && (
        <div className="flex justify-center">
          <MobileNav menuExp={menuExpanded} setMenuExpanded={setMenuExpanded} closeMenu={() => { }} />
        </div>
      )}
      <Menubar className="sm:hidden md:flex  flex-row mb-5 items-center bg-white border-b border-gray-200">
        <MenubarMenu>
          {
            navigation.map((item, idx) => (
              <MenubarTrigger key={idx} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                <Link href={item.url}>
                  {item.name}
                </Link>
              </MenubarTrigger>
            ))
          }
        </MenubarMenu>
      </Menubar>
    </div>
  )
};

export default Menu;
