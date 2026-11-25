import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Users,
  Wallet,
  Shield,
  BarChart3,
  Smartphone,
  ChevronDown,
  MessageCircle,
  Mail,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function PublicHome() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1])
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    document.title = 'QATAVEL — The infrastructure behind smarter lending'
  }, [])

  return (
    <div className="min-h-screen bg-[var(--q-deep)] text-[var(--q-text)] overflow-x-hidden">
      {/* ===== CINEMATIC HERO ===== */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background video / fallback gradient */}
        <motion.div style={{ scale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#05161A] via-[#0C7075]/40 to-[#05161A]" />
          {/* Animated gradient orbs for cinematic feel */}
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#0F969C]/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-[#6DA5C0]/15 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0C7075]/25 blur-[100px]" />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col"
        >
          {/* Nav */}
          <header className="flex items-center justify-between px-6 md:px-12 py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0F969C] to-[#6DA5C0] flex items-center justify-center font-bold text-sm text-[#05161A]">
                Q
              </div>
              <span className="text-xl font-semibold tracking-tight">QATAVEL</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                to="/login"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A3A42] bg-[#0A1F24]/60 backdrop-blur-md text-sm font-medium hover:border-[#0F969C] hover:bg-[#0F969C]/10 transition-all duration-300"
              >
                Login
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </header>

          {/* Hero text */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[#6DA5C0] text-sm md:text-base font-medium tracking-widest uppercase mb-6"
            >
              Microfinance Infrastructure
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] mb-6"
            >
              From every field visit
              <br />
              <span className="bg-gradient-to-r from-[#0F969C] via-[#6DA5C0] to-[#0F969C] bg-clip-text text-transparent">
                to one clear picture
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-[#8BA8B0] max-w-2xl mb-10 leading-relaxed"
            >
              Qatavel is the centrally owned platform that independent microfinance
              companies use to run branches, manage officers, process loans and
              collect repayments — all from one controlled infrastructure.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                to="/login"
                className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F969C] text-[#05161A] font-semibold text-base hover:bg-[#6DA5C0] transition-all duration-300 shadow-[0_0_30px_rgba(15,150,156,0.3)]"
              >
                Enter Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#capabilities"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1A3A42] text-[#E8F4F5] font-medium hover:border-[#0F969C]/50 transition-all duration-300"
              >
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pb-10 flex justify-center"
          >
            <a href="#capabilities" className="flex flex-col items-center gap-2 text-[#5A7A82] hover:text-[#6DA5C0] transition-colors">
              <span className="text-xs tracking-widest uppercase">Explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== PLATFORM OVERVIEW ===== */}
      <section id="capabilities" className="relative py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[#0F969C] text-sm font-medium tracking-widest uppercase mb-3">
              How Qatavel works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              One platform. Many companies.
            </h2>
            <p className="text-[#8BA8B0] text-lg max-w-2xl mx-auto">
              Independent microfinance companies rent access to the already-built
              Qatavel platform. Creating a company provisions a fully isolated tenant.
            </p>
          </motion.div>

          {/* Structure cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Building2, label: 'Infrastructure Owner', desc: 'Owns and operates the platform. Creates companies and monitors health.' },
              { icon: Users, label: 'Company', desc: 'Independent microfinance firm. Manages branches, workers and consolidated performance.' },
              { icon: Smartphone, label: 'Branch', desc: 'Physical or operational unit. Has its own URL, workers and payment provider.' },
              { icon: Wallet, label: 'Branch Workers', desc: 'Branch Manager and Collection Officers. Day-to-day field and portfolio work.' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative p-6 rounded-2xl border border-[#1A3A42] bg-[#0A1F24]/80 hover:border-[#0F969C]/40 hover:bg-[#0C1F24] transition-all duration-400"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F969C]/10 flex items-center justify-center mb-4 group-hover:bg-[#0F969C]/20 transition-colors">
                  <item.icon className="w-6 h-6 text-[#0F969C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                <p className="text-sm text-[#8BA8B0] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#072E33]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#0F969C] text-sm font-medium tracking-widest uppercase mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Everything a microfinance company needs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Branch & Worker Management', items: ['Create branches with unique URLs', 'BM and CO role accounts', 'Worker replacement with history', 'Performance tracking per officer'] },
              { icon: Wallet, title: 'Loan Lifecycle', items: ['12-stage application workflow', 'Live face & evidence capture', 'Weekly and daily repayment modes', 'Immutable schedules after activation'] },
              { icon: BarChart3, title: 'Collections & Visibility', items: ['Virtual account repayments', 'Loan + savings allocation', 'Real-time expected vs realised', 'Company and branch health alerts'] },
              { icon: Shield, title: 'Tenant Isolation', items: ['Strict company data separation', 'Branch-scoped payment providers', 'Encrypted provider credentials', 'Role-based workplace access'] },
              { icon: Smartphone, title: 'Field-Ready Experience', items: ['Mobile-first Collection Officer UI', 'Offline-friendly forms', 'In-app notifications only', 'Practical daily workflows'] },
              { icon: Building2, title: 'Central Control', items: ['Platform health overview', 'Company create / suspend / reactivate', 'No company self-signup', 'Single identity across tenants'] },
            ].map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 rounded-2xl border border-[#1A3A42] bg-[var(--q-card)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F969C]/15 flex items-center justify-center">
                    <cap.icon className="w-5 h-5 text-[#0F969C]" />
                  </div>
                  <h3 className="font-semibold text-lg">{cap.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#8BA8B0]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0F969C] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for controlled, isolated operations
            </h2>
            <p className="text-[#8BA8B0] text-lg leading-relaxed mb-8">
              Every company runs as a fully isolated tenant. Branch data, worker portfolios,
              customer records, loans and payment providers never cross company boundaries.
              The infrastructure owner sees platform health — never the financial records of any company.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A3A42] text-sm text-[#6DA5C0]">
              <Shield className="w-4 h-4" />
              Tenant separation is a core product requirement
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT / CTA ===== */}
      <section className="py-24 px-6 md:px-12 border-t border-[#1A3A42]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need this infrastructure?
            </h2>
            <p className="text-[#8BA8B0] text-lg mb-10">
              Qatavel is not open for self-registration. Contact us to discuss using
              the platform for your microfinance operations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/2348154076947"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-medium hover:bg-[#25D366]/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp: 0815 407 6947
              </a>
              <a
                href="https://wa.me/2347061743252"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-medium hover:bg-[#25D366]/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                0706 174 3252
              </a>
              <a
                href="mailto:corneliusadedejivictor@gmail.com"
                className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-[#1A3A42] text-[#E8F4F5] font-medium hover:border-[#0F969C] transition-all"
              >
                <Mail className="w-5 h-5" />
                Email us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-6 md:px-12 border-t border-[#1A3A42]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F969C] to-[#6DA5C0] flex items-center justify-center font-bold text-xs text-[#05161A]">
              Q
            </div>
            <span className="font-semibold">QATAVEL</span>
            <span className="text-[#5A7A82] text-sm">· The infrastructure behind smarter lending</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#5A7A82]">
            <Link to="/login" className="hover:text-[#0F969C] transition-colors">Login</Link>
            <Link to="/dev" className="hover:text-[#0F969C] transition-colors">Dev Access</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
