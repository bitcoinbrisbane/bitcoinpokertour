import Link from "next/link";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar";

const Menu = () => (
  <Menubar className="bg-white border-b border-gray-200">
    <MenubarMenu>
      <MenubarTrigger className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
        Home
      </MenubarTrigger>
      <MenubarTrigger className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
        Schedule
      </MenubarTrigger>
      <MenubarTrigger className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
        Promotions
      </MenubarTrigger>
      <MenubarTrigger className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
        Treasury
      </MenubarTrigger>
      <MenubarTrigger className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
        Bitcoin Guide
      </MenubarTrigger>
      <MenubarTrigger className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
        Contact
      </MenubarTrigger>
    </MenubarMenu>
  </Menubar>
);

export default Menu;
