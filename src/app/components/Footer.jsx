import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container flex flex-col gap-4 p-12 sm:flex-row sm:items-center sm:justify-between">
        <span>Ismail Abbasi</span>
        <nav className="flex flex-wrap gap-4 text-sm text-[#ADB7BE]">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/llms.txt" className="hover:text-white">
            llms.txt
          </Link>
        </nav>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
