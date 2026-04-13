// Cinematic Noir — Home Page
// Deep blacks, blue/gold selective luminance, futuristic AI interactive elements
import { Link } from 'wouter';
import { IMAGES, BRAND, VIDEO } from '@/lib/images';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleCanvas from '@/components/ParticleCanvas';
import FloatingOrbs from '@/components/FloatingOrbs';
import GlowCard from '@/components/GlowCard';
import AnimatedGradient from '@/components/AnimatedGradient';
import { useParallax } from '@/hooks/useScrollAnimation';
import SEOHead from '@/components/SEOHead';
import { ArrowRight, Clock, Camera, Zap, Star, ChevronRight, CheckCircle2, Gift, Shield, Users, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const services = [
  {
    title: 'Real Estate',
    desc: 'Stunning property visuals that sell homes faster.',
    image: IMAGES.realEstateExterior,
    href: '/services/real-estate',
    glowColor: 'blue' as const,
  },
  {
    title: 'Events',
    desc: 'Every moment captured with cinematic precision.',
    image: IMAGES.corporateGala,
    href: '/services/events',
    glowColor: 'gold' as const,
  },
  {
    title: 'Weddings',
    desc: 'Your love story, told through our lens.',
    image: IMAGES.weddingFirstDance,
    href: '/services/weddings',
    glowColor: 'blue' as const,
  },
  {
    title: 'Photo',
    desc: 'Professional sessions for any occasion.',
    image: IMAGES.photoStudio,
    href: '/services/photo',
    glowColor: 'gold' as const,
  },
  {
    title: 'Video',
    desc: 'Cinematic video production that moves audiences.',
    image: IMAGES.videoProduction,
    href: '/services/video',
    glowColor: 'mixed' as const,
  },
];

const portfolioItems = [
  { image: IMAGES.realEstateInterior, category: 'Real Estate' },
  { image: IMAGES.weddingOutdoor, category: 'Wedding' },
  { image: IMAGES.musicFestival, category: 'Event' },
  { image: IMAGES.aerialMiami, category: 'Aerial' },
  { image: IMAGES.portrait, category: 'Portrait' },
  { image: IMAGES.droneVideography, category: 'Video' },
];

const testimonials = [
  {
    text: "The Lens Bros delivered our real estate photos in under 18 hours. The quality was exceptional — our listings sold 40% faster.",
    author: "Sarah Mitchell",
    role: "Real Estate Agent, Coldwell Banker",
    rating: 5,
  },
  {
    text: "They captured our wedding day perfectly. Every emotion, every detail. We couldn't have asked for a better team.",
    author: "James & Emily Rivera",
    role: "Wedding Clients",
    rating: 5,
  },
  {
    text: "The event coverage was outstanding. Professional, discreet, and the turnaround time was unbelievable.",
    author: "David Chen",
    role: "Corporate Events Director",
    rating: 5,
  },
];

// Hero video — real estate cinematic background
const HERO_VIDEO_URL = VIDEO.heroVideo;

export default function Home() {
  const { ref: heroParallax, offset: heroOffset } = useParallax(0.15);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Lens Bros | Shot Today. Delivered Tomorrow. | Chicago Photography & Video"
        description="Chicago's premier photography and video production company. Real estate, weddings, events — delivered within 24 hours."
        canonical="https://thelensbros.com"
        keywords="Chicago photography, real estate photography Chicago, wedding photographer Chicago, event photography, video production"
      />
      <Navbar />

      {/* ═══════════════ HERO WITH VIDEO BACKGROUND ═══════════════ */}
      <section ref={heroParallax} className="relative min-h-svh flex items-center overflow-hidden py-12 lg:py-0">
        {/* Video/Image Background */}
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${heroOffset}px)` }}>
          {HERO_VIDEO_URL ? (
            <video autoPlay loop muted playsInline preload="auto" className="w-full h-[115%] object-cover" poster={IMAGES.hero}>
              <source src={HERO_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <img src={IMAGES.hero} alt="Professional photographer with Chicago skyline" className="w-full h-[115%] object-cover" width={1600} height={893} fetchPriority="high" decoding="sync" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.04_0.01_270/0.95)] via-[oklch(0.04_0.01_270/0.8)] to-[oklch(0.04_0.01_270/0.5)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.01_270)] via-transparent to-[oklch(0.04_0.01_270/0.3)]" />
        </div>

        {/* Particles (desktop only for perf) */}
        <div className="absolute inset-0 z-[1] hidden lg:block">
          <ParticleCanvas particleCount={25} connectionDistance={80} speed={0.15} />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">

            {/* LEFT — Copy (mobile: compact, desktop: full) */}
            <div className="lg:col-span-7">
              {/* Social proof - single line */}
              <AnimatedSection delay={100}>
                <div className="flex items-center gap-3 text-white/40 text-[11px] mb-3">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-[oklch(0.75_0.14_80)] text-[oklch(0.75_0.14_80)]" />
                    ))}
                  </div>
                  <span><strong className="text-white/60">4.9/5</strong> from 500+ projects</span>
                  <span className="hidden md:inline text-[oklch(0.75_0.14_80)] font-display uppercase tracking-[0.15em] font-medium">Chicago &bull; Miami</span>
                </div>
              </AnimatedSection>

              {/* H1 */}
              <AnimatedSection delay={200}>
                <h1 className="font-display font-extrabold text-[1.75rem] leading-[1] sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-3">
                  We Shoot It Today.<br />
                  <span className="text-gradient-blue-gold">You Get It Tomorrow.</span>
                </h1>
              </AnimatedSection>

              {/* Subhead — hidden on mobile to save space */}
              <AnimatedSection delay={300}>
                <p className="hidden sm:block text-white/50 text-sm md:text-base leading-relaxed max-w-lg mb-3 md:mb-4">
                  Chicago's go-to photography crew for real estate, events, and weddings. Fully edited photos in your inbox by morning. <strong className="text-white/70">Guaranteed.</strong>
                </p>
                <p className="sm:hidden text-white/50 text-sm leading-relaxed mb-3">
                  Real estate, events, weddings — fully edited in 24hrs. <strong className="text-white/70">Guaranteed.</strong>
                </p>
              </AnimatedSection>

              {/* Value pills — compact row */}
              <AnimatedSection delay={350}>
                <div className="flex flex-wrap gap-1.5 mb-2 md:mb-5">
                  {[
                    { icon: Clock, text: '24hr Delivery' },
                    { icon: Shield, text: '100% Guarantee' },
                    { icon: Camera, text: '500+ Shoots' },
                  ].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px]">
                      <item.icon className="w-3 h-3 text-[oklch(0.65_0.2_250)]" />
                      {item.text}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

              {/* CTAs — desktop only (mobile uses form) */}
              <div className="hidden lg:block">
                <AnimatedSection delay={450}>
                  <div className="flex items-center gap-3 mb-3">
                    <Link
                      href="/contact"
                      className="group relative flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.55_0.18_250)] text-white font-display font-bold text-sm rounded-lg hover:shadow-[0_0_30px_oklch(0.65_0.2_250/0.35)] transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                      <span className="relative">Book Your Shoot</span>
                      <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-center gap-2.5 px-6 py-3 border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-display font-medium text-sm rounded-lg transition-all duration-300"
                    >
                      See Pricing
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-white/25 text-[11px]">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400/60" /> No upfront cost</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400/60" /> Free re-shoots</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400/60" /> Cancel anytime</span>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* RIGHT — Lead Form */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={300} direction="right">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-[oklch(0.65_0.2_250/0.15)] to-[oklch(0.75_0.14_80/0.08)] rounded-2xl blur-xl animate-glow-pulse hidden lg:block" />
                  <div className="relative bg-[oklch(0.06_0.02_260/0.9)] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden">
                    {/* Urgency banner */}
                    <div className="bg-gradient-to-r from-[oklch(0.75_0.14_80)] to-[oklch(0.65_0.16_60)] px-4 py-2 text-center">
                      <span className="text-white text-[11px] font-display font-bold uppercase tracking-wider">
                        15% Off Your First Shoot — This Month Only
                      </span>
                    </div>

                    <div className="p-4 md:p-5">
                      <h3 className="font-display font-bold text-base md:text-lg text-white mb-0.5 leading-tight">Get Your Free Quote</h3>
                      <p className="text-white/35 text-[11px] mb-3">30 seconds to fill out. We respond within 1 hour.</p>

                      <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); window.location.href = '/contact'; }}>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="Name" required className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[oklch(0.65_0.2_250/0.4)] transition-all" />
                          <input type="tel" placeholder="Phone" className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[oklch(0.65_0.2_250/0.4)] transition-all" />
                        </div>
                        <input type="email" placeholder="Email Address" required className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[oklch(0.65_0.2_250/0.4)] transition-all" />
                        <select
                          required defaultValue=""
                          className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/25 text-sm focus:outline-none focus:border-[oklch(0.65_0.2_250/0.4)] transition-all appearance-none"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                        >
                          <option value="" disabled>What do you need?</option>
                          <option value="real-estate">Real Estate Photography</option>
                          <option value="events">Event Coverage</option>
                          <option value="weddings">Wedding Photography</option>
                          <option value="photo">Portrait / Photo Session</option>
                          <option value="video">Video Production</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                        <button type="submit" className="group relative flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.55_0.18_250)] text-white font-display font-bold text-sm rounded-lg hover:shadow-[0_0_30px_oklch(0.65_0.2_250/0.35)] transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                          <span className="relative">Get My Free Quote</span>
                          <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>

                      <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-white/[0.05]">
                        <span className="flex items-center gap-1 text-white/20 text-[10px]"><Shield className="w-2.5 h-2.5" /> Free</span>
                        <span className="flex items-center gap-1 text-white/20 text-[10px]"><Clock className="w-2.5 h-2.5" /> 1hr reply</span>
                        <span className="flex items-center gap-1 text-white/20 text-[10px]"><Users className="w-2.5 h-2.5" /> 500+ clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Scroll indicator — desktop only */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-white/15 text-[9px] uppercase tracking-[0.3em] font-display">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-[oklch(0.65_0.2_250/0.3)] to-transparent" />
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative bg-[oklch(0.06_0.01_270)] border-y border-white/5 py-6 md:py-10 overflow-hidden">
        <AnimatedGradient variant="dark" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
            {[
              { value: 24, suffix: 'hr', label: 'Delivery Time' },
              { value: 500, suffix: '+', label: 'Projects Completed' },
              { value: 98, suffix: '%', label: 'Client Satisfaction' },
              { value: 2, suffix: '', label: 'Cities & Growing' },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-white mb-0.5">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/30 text-xs">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES OVERVIEW ═══════════════ */}
      <section className="relative py-12 md:py-20 bg-grain overflow-hidden">
        <FloatingOrbs variant="subtle" />
        <div className="container relative z-10">
          <AnimatedSection>
            <SectionLabel label="What We Do" number="01" />
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-2 max-w-xl">
              Services Built for <span className="text-gradient-blue-gold">Speed & Quality</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base max-w-xl mb-8 md:mb-12">
              From real estate to weddings, we deliver premium visual content within 24 hours — without compromising on quality.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <GlowCard glowColor={service.glowColor} className="bg-card">
                  <Link
                    href={service.href}
                    className="group relative block overflow-hidden rounded-xl aspect-[4/3]"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.01_270/0.95)] via-[oklch(0.06_0.01_270/0.3)] to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-gradient-blue-gold transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/40 text-sm mb-3">{service.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-[oklch(0.65_0.2_250)] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Learn More <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY THE LENS BROS ═══════════════ */}
      <section className="relative py-12 md:py-20 overflow-hidden content-auto">
        <AnimatedGradient variant="accent" />
        <FloatingOrbs variant="section" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <AnimatedSection>
                <SectionLabel label="Why Choose Us" number="02" />
                <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-3">
                  The 24-Hour <span className="text-gradient-blue-gold">Promise</span>
                </h2>
                <p className="text-white/40 text-sm md:text-base leading-relaxed mb-6">
                  We guarantee delivery of your professionally edited photos and videos within 24 hours of your shoot. No exceptions.
                </p>
              </AnimatedSection>

              <div className="space-y-3">
                {[
                  { icon: Clock, title: '24-Hour Turnaround', desc: 'Guaranteed delivery within 24 hours after every shoot.' },
                  { icon: Camera, title: 'Professional Equipment', desc: 'Top-tier cameras, lenses, drones, and lighting for every project.' },
                  { icon: Zap, title: 'Instant Booking', desc: 'Book online in minutes. We handle the rest.' },
                ].map((item, i) => (
                  <AnimatedSection key={i} delay={i * 150}>
                    <GlowCard glowColor={i === 1 ? 'gold' : 'blue'} className="bg-[oklch(0.1_0.015_270/0.5)]">
                      <div className="flex items-start gap-4 p-4">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-[oklch(0.65_0.2_250/0.1)] border border-[oklch(0.65_0.2_250/0.2)] flex items-center justify-center group-hover:bg-[oklch(0.65_0.2_250/0.15)] transition-colors">
                          <item.icon className="w-5 h-5 text-[oklch(0.65_0.2_250)]" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-white text-lg mb-1">{item.title}</h3>
                          <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </GlowCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection direction="right">
              <div className="relative">
                <img
                  src={IMAGES.realEstateKitchen}
                  alt="Professional real estate photography"
                  className="rounded-lg w-full aspect-[4/3] object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                {/* Floating badge with glow pulse */}
                <div className="absolute -bottom-6 -left-6 bg-[oklch(0.1_0.015_270/0.95)] backdrop-blur-xl border border-[oklch(0.65_0.2_250/0.2)] rounded-lg p-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.65_0.2_250)] to-[oklch(0.75_0.14_80)] flex items-center justify-center animate-glow-pulse">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-lg">24hrs</div>
                      <div className="text-white/40 text-xs">Avg. Delivery</div>
                    </div>
                  </div>
                </div>
                {/* Glow effect behind image */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[oklch(0.65_0.2_250/0.12)] to-[oklch(0.75_0.14_80/0.08)] rounded-xl blur-2xl -z-10 animate-glow-pulse" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO PREVIEW ═══════════════ */}
      <section className="relative py-12 md:py-20 bg-[oklch(0.06_0.01_270)] content-auto overflow-hidden">
        <FloatingOrbs variant="subtle" />
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
              <div>
                <SectionLabel label="Our Work" number="03" />
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
                  Recent <span className="text-gradient-blue-gold">Projects</span>
                </h2>
              </div>
              <Link
                href="/services"
                className="group flex items-center gap-2 text-[oklch(0.65_0.2_250)] font-display font-medium text-sm hover:gap-3 transition-all"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {portfolioItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <GlowCard glowColor={i % 2 === 0 ? 'blue' : 'gold'}>
                  <div className="group relative overflow-hidden rounded-xl aspect-square bg-card cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.category}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-[oklch(0.06_0.01_270/0)] group-hover:bg-[oklch(0.06_0.01_270/0.6)] transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-display font-semibold text-white text-sm uppercase tracking-[0.15em] px-4 py-2 border border-white/20 rounded-md backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-grain content-auto">
        <AnimatedGradient variant="dark" />
        <FloatingOrbs variant="section" />

        <div className="container relative z-10">
          <AnimatedSection className="text-center mb-8 md:mb-12">
            <SectionLabel label="Testimonials" number="04" />
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white">
              What Our <span className="text-gradient-blue-gold">Clients</span> Say
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <GlowCard glowColor={i === 1 ? 'gold' : 'blue'} className="bg-[oklch(0.1_0.015_270/0.5)] h-full">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[oklch(0.75_0.14_80)] text-[oklch(0.75_0.14_80)]" />
                      ))}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                    <div>
                      <div className="font-display font-semibold text-white text-sm">{t.author}</div>
                      <div className="text-white/30 text-xs mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-12 md:py-20 overflow-hidden content-auto">
        <AnimatedGradient variant="accent" />
        <FloatingOrbs variant="hero" />

        {/* Particle canvas for CTA section */}
        <div className="absolute inset-0 z-[1]">
          <ParticleCanvas particleCount={20} connectionDistance={80} speed={0.15} />
        </div>

        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <img src={BRAND.iconSmall} alt="" className="w-16 h-16 mx-auto mb-8 opacity-60 animate-glow-pulse" width={64} height={64} loading="lazy" decoding="async" />
            <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-4 max-w-2xl mx-auto leading-tight">
              Ready to Create Something <span className="text-gradient-blue-gold">Extraordinary</span>?
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
              Book your shoot today and receive professionally edited content within 24 hours. Based in Chicago, serving nationwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[oklch(0.65_0.2_250)] to-[oklch(0.55_0.18_250)] text-white font-display font-semibold rounded-md hover:shadow-[0_0_50px_oklch(0.65_0.2_250/0.4)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                <span className="relative">Get Started</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+13125551234"
                className="flex items-center gap-3 px-8 py-4 border border-white/15 text-white/70 hover:text-white hover:border-[oklch(0.65_0.2_250/0.3)] hover:shadow-[0_0_20px_oklch(0.65_0.2_250/0.1)] font-display font-medium rounded-md transition-all duration-300"
              >
                Call (312) 555-1234
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
