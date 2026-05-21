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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <TopBar />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="All Phase Plumbing" className="h-12 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                className="px-2 xl:px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={opts.phone_href}
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            <Phone className="size-4" />
            {opts.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                activeProps={{ className: "text-primary bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={opts.phone_href}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-base font-semibold text-accent-foreground"
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
