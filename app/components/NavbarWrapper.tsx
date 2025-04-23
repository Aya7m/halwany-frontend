"use client";
import { usePathname } from "next/navigation";


import Navbar from "./Navbar";
import AccountNavbar from "./AccountNavbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  // لو إحنا في صفحة الأكونت، نعرض AccountNavbar
  if (pathname.startsWith("/myAccount")) {
    return <AccountNavbar />;
  }

  // باقي الصفحات، نعرض MainNavbar
  return <Navbar/>;
};

export default NavbarWrapper;
