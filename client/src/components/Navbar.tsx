import { useState, useEffect } from 'react';
// Navbar: fixed compact bar, no scroll state changes
import { Link, useLocation } from 'wouter';
import { BRAND } from '@/lib/images';
import { Menu, X, ChevronDown } from 'lucide-react';

const serviceLinks = [
  { label: 'Real Estate Photography', href: '/services/real-estate' },
  { label: 'Events', href: '/services/events' },
  { label: 'Weddings', href: '/services/weddings' },
  { label: 'Photo', href: '/services/photo' },
  { label: 'Video', href: '/services/video' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', children: serviceLinks },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
      <div className="container flex items-center justify-between h-12">
        <Link href="/" className="flex items-center shrink-0 group">
          <img
            src={BRAND.icon}
            alt="The Lens Bros"
            className="h-7 w-7 rounded-full object-contain"
            width={32}
            height={32}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                    location.startsWith('/services')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </Link>
                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 pt-1.5 transition-all duration-200 ${
                    servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-[oklch(0.1_0.02_260/0.95)] backdrop-blur-xl border border-white/[0.08] rounded-lg py-1.5 min-w-[200px] shadow-2xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location === child.href
                            ? 'text-white bg-white/[0.06]'
                            : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  location === link.href
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="ml-3 px-4 py-1.5 text-sm font-semibold font-display bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.75_0.14_80)] text-white rounded-md hover:opacity-90 transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1.5 text-white/70 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[oklch(0.08_0.02_260/0.95)] backdrop-blur-xl border-t border-white/[0.06] px-4 py-3 space-y-0.5">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="pl-3 space-y-0.5 pb-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-white/45 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="block mx-2 mt-2 px-4 py-2.5 text-center text-sm font-semibold font-display bg-gray-900 text-white rounded-md"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
