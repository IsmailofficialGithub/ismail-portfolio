"use client";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

const NavLink = ({ href, title, onClick }) => {
  // Case 1: Button (logout)
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
      >
        {title}
      </button>
    );
  }

  // Case 2: Smooth scroll for in-page section (#about, #projects, etc.)
  if (href.startsWith("#")) {
    return (
      <ScrollLink
        to={href.replace("#", "")} // react-scroll needs ID without #
        smooth={true}
        duration={100}
        offset={-80} // adjust for sticky navbar height
        spy={true} // adds "active" class when in view
        className="cursor-pointer block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
        activeClass="text-white font-semibold"
      >
        {title}
      </ScrollLink>
    );
  }

  // Case 3: Normal Next.js navigation (other pages)
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
