import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[oklch(0.1_0.04_240/0.85)] backdrop-blur-xl border-b border-[oklch(0.65_0.2_250/0.1)] shadow-lg shadow-[oklch(0.65_0.2_250/0.05)]'
          : 'bg-[oklch(0.08_0.03_240/0.5)] backdrop-blur-md'
      }`}
    >
      {/* Full-size container: h-16 mobile, h-20 desktop */}
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-[spin_4s_linear_infinite] motion-reduce:animate-none" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 opacity-50 blur-sm animate-[spin_3s_linear_infinite_reverse] motion-reduce:animate-none" />
            <img
              src={BRAND.icon}
              alt="The Lens Bros"
              className="relative h-9 md:h-11 w-9 md:w-11 rounded-full object-contain ring-1 ring-orange-400/50"
              width={44}
              height={44}
            />
          </div>
          <img
            src={BRAND.logoTagline}
            alt="Shot Today. Delivered Tomorrow."
            className="h-8 md:h-10 w-auto object-contain brightness-125"
            width={200}
            height={40}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
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
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    location.startsWith('/services')
                      ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                      : 'text-white/80 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]'
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </Link>
                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-[oklch(0.1_0.03_240/0.95)] backdrop-blur-xl border border-[oklch(0.65_0.2_250/0.15)] rounded-lg py-2 min-w-[220px] shadow-2xl shadow-[oklch(0.65_0.2_250/0.08)]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-5 py-2.5 text-sm transition-colors ${
                          location === child.href
                            ? 'text-white bg-[oklch(0.65_0.2_250/0.1)]'
                            : 'text-white/60 hover:text-white hover:bg-[oklch(0.65_0.2_250/0.08)]'
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
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  location === link.href
                    ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                    : 'text-white/80 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="ml-4 px-5 py-2 text-sm font-semibold font-display bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.75_0.14_80)] text-white rounded-md hover:opacity-90 hover:shadow-[0_0_20px_oklch(0.65_0.2_250/0.3)] transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[oklch(0.08_0.03_240/0.95)] backdrop-blur-xl border-t border-[oklch(0.65_0.2_250/0.1)] px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-white/85 hover:text-white transition-colors"
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="pl-4 space-y-0.5 pb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-white/50 hover:text-white transition-colors"
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
                className="block px-4 py-3 text-base font-medium text-white/85 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="block mx-3 mt-3 px-5 py-3 text-center text-sm font-semibold font-display bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.75_0.14_80)] text-white rounded-md"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
