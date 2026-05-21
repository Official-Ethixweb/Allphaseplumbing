import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { TopBar } from "./TopBar";
import { useSiteOptions } from "@/hooks/use-site-options";
import logo from "@/assets/app-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services/plumbing", label: "Plumbing" },
  { to: "/services/sewer-services", label: "Sewer" },
  { to: "/services", label: "Commercial" },
  { to: "/blog", label: "Blog" },
  { to: "/coupons", label: "Coupons" },
  { to: "/service-area", label: "Service Area" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const opts = useSiteOptions();

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#1E3A7B]/10 shadow-sm">
      <TopBar />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* Logo — top left, prominent */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="All Phase Plumbing" className="h-16 w-auto" />
          </Link>

          {/* Nav — center */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                className="px-3 py-2 text-[15px] font-semibold text-[#1E3A6E] hover:text-[#F5C842] transition-colors rounded-md hover:bg-[#1E3A6E]/5"
                activeProps={{ className: "text-[#F5C842] border-b-2 border-[#F5C842]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Phone — right, orange button */}
          <a
            href={opts.phone_href}
            className="hidden md:inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-bold text-white shadow-md hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}
          >
            <Phone className="size-4" />
            {opts.phone}
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[#1E3A6E] hover:bg-[#1E3A6E]/10"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t-2 border-[#1E3A7B]/10 bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-md text-base font-semibold text-[#1E3A6E] hover:bg-[#1E3A6E]/5 hover:text-[#F5C842]"
                activeProps={{ className: "text-[#F5C842] bg-[#1E3A6E]/5" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={opts.phone_href}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-base font-bold text-white hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)" }}
            >
              <Phone className="size-4" />
              {opts.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
