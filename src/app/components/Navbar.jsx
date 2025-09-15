"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  
const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Blogs", path: "#blogs" },
  { title: "Contact", path: "#contact" },
  ...(status === "authenticated"
    ? [
        { title: "Dashboard", path: "/admin/dashboard" },
        { title: "Logout", path: "", onClick: handleLogout }, // use onClick
      ]
    : []),
];


  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-[10000] bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          Ismail abbasi
        </Link>

        {/* Mobile Menu Button */}
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="menu hidden md:block md:w-auto" id="navbar">
       <ul className="flex p-3 md:p-0 md:flex-row md:space-x-8 mt-0">
  {navLinks.map((link, i) => (
    <li key={i}>
      <NavLink
        href={link.path}
        title={link.title}
        // only pass onClick if present (NavLink checks for it)
        onClick={link.onClick ? () => { link.onClick(); setNavbarOpen(false); } : undefined}
      />
    </li>
  ))}
</ul>
        </div>
      </div>

      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
