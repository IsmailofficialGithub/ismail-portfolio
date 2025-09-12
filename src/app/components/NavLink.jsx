// components/NavLink.tsx
"use client";

import Link from "next/link";
import { Link as ScrollLink, scroller } from "react-scroll";
import { usePathname, useRouter } from "next/navigation";

const NavLink = ({ href = "/", title, onClick, className = "", offset = -80 }) => {
  const pathname = usePathname(); // current path ("/", "/blogs", etc.)
  const router = useRouter();

  // 1) Action button (Logout, etc.)
  if (typeof onClick === "function") {
    return (
      <button
        onClick={onClick}
        className={`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white ${className}`}
      >
        {title}
      </button>
    );
  }

  // 2) In-page anchor (like "#about")
  if (href && href.startsWith("#")) {
    const id = href.replace("#", "");

    // If already on homepage, use react-scroll for smooth animation
    if (pathname === "/") {
      return (
        <ScrollLink
          to={id}
          smooth={true}
          duration={100}
          offset={offset} // tweak for sticky navbar height
          spy={true}
          className={`cursor-pointer block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white ${className}`}
          activeClass="text-white font-semibold"
        >
          {title}
        </ScrollLink>
      );
    }

    // If on another page, navigate to /#id then smooth scroll
    const handleGoHomeAndScroll = async (e) => {
      e.preventDefault();
      // navigate to /#id
      await router.push(`/${href}`); // results URL: /#about
      // small delay to let homepage mount; then smooth-scroll
      setTimeout(() => {
        scroller.scrollTo(id, { smooth: true, duration: 600, offset });
      }, 120);
    };

    return (
      <a
        href={href}
        onClick={handleGoHomeAndScroll}
        className={`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white ${className}`}
      >
        {title}
      </a>
    );
  }

  // 3) Normal page link (e.g. "/blogs", "/admin/...")
  return (
    <Link href={href} className={`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white ${className}`}>
      {title}
    </Link>
  );
};

export default NavLink;
