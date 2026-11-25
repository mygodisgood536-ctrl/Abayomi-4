import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Users,
  Wallet,
  Shield,
  BarChart3,
  Play,
  CheckCircle2,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function PublicHome() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.75], [0, 60])

  useEffect(() => {
    document.title = 'QATAVEL — From every field visit to one clear picture'
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#2F3A36] overflow-x-hidden">
      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F7F9F6]/85 border-b border-[#E2E8E2]/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2F3A36] flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-[15px] tracking-tight">qatavel</div>
              <div className="text-[10px] text-[#7D897F] uppercase tracking-wider">Microfinance operations</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#7D897F]">
            <a href="#capabilities" className="hover:text-[#2F3A36] transition-colors">Platform</a>
            <a href="#workplaces" className="hover:text-[#2F3A36] transition-colors">Workplaces</a>
            <a href="#how" className="hover:text-[#2F3A36] transition-colors">How it works</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-[#7D897F] hover:text-[#2F3A36] transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              to="/dev"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2F3A36] text-white text-sm font-medium hover:bg-[#1F2824] transition-colors"
            >
              Explore Qatavel
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Soft background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[420px] h-[420px] rounded-full bg-[#C5DCE0]/40 blur-[90px]" />
          <div className="absolute bottom-10 left-[10%] w-[360px] h-[360px] rounded-full bg-[#D4EDE0]/50 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-[#F3E4D4]/30 blur-[70px]" />
        </div>

        <motion.div style={{ opacity, y }} className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <div>
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E2E8E2] text-xs text-[#5B8A7A] font-medium mb-8 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B8A7A]" />
                Built for the work between the numbers
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl md:text-[3.4rem] font-semibold tracking-tight leading-[1.12] mb-6"
              >
                From every field
                <br />
                visit to{' '}
                <span className="text-[#7A9E8E] italic font-medium">one clear</span>
                <br />
                picture.
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-[#7D897F] text-lg leading-relaxed max-w-md mb-10"
              >
                Qatavel brings company oversight, branch operations and
                field work into one calm, connected view.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/dev"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2F3A36] text-white font-medium text-[15px] hover:bg-[#1F2824] transition-all shadow-md"
                >
                  Enter the platform
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[#2F3A36] font-medium text-[15px] hover:bg-white/60 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white border border-[#E2E8E2] flex items-center justify-center shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                  See how Qatavel works
                </a>
              </motion.div>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-12 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {['#2F3A36', '#C5DCE0', '#F3E4D4', '#D4EDE0'].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#F7F9F6] flex items-center justify-center text-[10px] font-semibold text-white"
                      style={{ background: c, color: i === 0 ? '#fff' : '#2F3A36' }}
                    >
                      {['AM', 'KO', 'TA', '+'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-[#2F3A36]">Designed for real field teams</div>
                  <div className="text-[#7D897F] text-xs">One platform. Every operational layer.</div>
                </div>
              </motion.div>
            </div>

            {/* Right visual — floating cards composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block h-[420px]"
            >
              {/* Main soft panel */}
              <div className="absolute inset-4 rounded-[28px] bg-gradient-to-br from-[#C5DCE0]/60 via-[#D4EDE0]/40 to-[#F3E4D4]/50 border border-white/60 shadow-[0_20px_60px_rgba(47,58,54,0.08)]" />

              {/* Floating badge — top left */}
              <div className="absolute top-8 left-0 px-3.5 py-2 rounded-full bg-white/90 border border-[#E2E8E2] shadow-md text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D9B6E]" />
                Field operations, connected
              </div>

              {/* Floating card — top right */}
              <div className="absolute top-6 right-0 px-4 py-3 rounded-2xl bg-white shadow-lg border border-[#E2E8E2]/80">
                <div className="flex items-center gap-2 text-xs text-[#7D897F] mb-1">
                  <span className="w-4 h-4 rounded-full bg-[#F3E4D4] flex items-center justify-center text-[10px]">↻</span>
                  Live branch pulse
                </div>
                <div className="text-[11px] text-[#A0ABA3]">Updated 2 minutes ago</div>
              </div>

              {/* Center metric card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 p-5 rounded-2xl bg-white shadow-xl border border-[#E2E8E2]/60">
                <div className="text-xs text-[#7D897F] mb-1">Today’s route</div>
                <div className="text-3xl font-semibold tracking-tight">18 visits</div>
                <div className="text-xs text-[#3D9B6E] mt-1 font-medium">↑ +12.4%</div>
              </div>

              {/* Bottom left card */}
              <div className="absolute bottom-10 left-2 px-4 py-3 rounded-2xl bg-white/95 shadow-lg border border-[#E2E8E2]/80 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-[#D4EDE0] flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3D9B6E]" />
                  </div>
                  <span className="text-xs font-medium">Every record has a place</span>
                </div>
                <div className="text-[11px] text-[#7D897F]">Customers, groups, loans and receipts</div>
              </div>

              {/* Bottom right small */}
              <div className="absolute bottom-16 right-4 px-3.5 py-2.5 rounded-xl bg-white shadow-md border border-[#E2E8E2] text-xs">
                <div className="text-[#7D897F]">Realised today</div>
                <div className="font-semibold text-sm">₦1.2m</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== STRIP ===== */}
      <div className="border-y border-[#E2E8E2] bg-white/50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm text-[#7D897F]">
          <span className="font-medium text-[#2F3A36] text-xs tracking-wider uppercase">One operating picture for teams that move across</span>
          <span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> branches</span>
          <span className="flex items-center gap-2"><Users className="w-4 h-4" /> field workers</span>
          <span className="flex items-center gap-2"><Wallet className="w-4 h-4" /> loan cycles</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> verified receipts</span>
        </div>
      </div>

      {/* ===== QUIETER WAY ===== */}
      <section id="capabilities" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-[#7D897F] mb-3">A quieter way to operate</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              The whole picture,<br />without the noise.
            </h2>
            <p className="text-[#7D897F] text-lg max-w-xl mx-auto">
              Qatavel gives each person the view they need, while keeping the work
              connected from infrastructure owner to field visit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                bg: 'bg-[#C5DCE0]',
                num: '01',
                title: 'See performance in context',
                desc: 'Expected, realised and overdue collections live together, so the next decision is easier to make.',
              },
              {
                bg: 'bg-[#D4EDE0]',
                num: '02',
                title: 'Keep every identity clear',
                desc: 'Portfolio ownership and personal history stay distinct, even when a worker changes.',
              },
              {
                bg: 'bg-[#F3E4D4]',
                num: '03',
                title: 'Built around trust',
                desc: 'From verified provider receipts to saved application stages, nothing is presented as done before it is.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`${card.bg} rounded-[24px] p-7 relative min-h-[240px] flex flex-col`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center">
                    {i === 0 && <BarChart3 className="w-5 h-5 text-[#2F3A36]" />}
                    {i === 1 && <Users className="w-5 h-5 text-[#2F3A36]" />}
                    {i === 2 && <Shield className="w-5 h-5 text-[#2F3A36]" />}
                  </div>
                  <span className="text-xs font-medium text-[#7D897F]">{card.num}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 tracking-tight">{card.title}</h3>
                <p className="text-sm text-[#2F3A36]/75 leading-relaxed flex-1">{card.desc}</p>
                <div className="mt-6 w-8 h-8 rounded-full bg-white/60 flex items-center justify-center self-end">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKPLACES ===== */}
      <section id="workplaces" className="py-24 px-6 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-[#7D897F] mb-3">Four ways in</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Distinct workplaces.
            </h2>
            <p className="text-[#7D897F] mt-2 max-w-lg">
              Each role opens into the exact responsibility in front of you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                bg: 'bg-[#2F3A36] text-white',
                label: 'Platform control room',
                title: 'Infrastructure owner',
                desc: 'Monitor platform health and manage every company using Qatavel.',
                to: '/owner',
              },
              {
                bg: 'bg-[#C5DCE0]',
                label: 'Management workspace',
                title: 'Company workplace',
                desc: 'See every branch, worker, provider connection and performance signal.',
                to: '/company',
              },
              {
                bg: 'bg-[#D4EDE0]',
                label: 'Branch command centre',
                title: 'Branch manager',
                desc: 'Keep a clear view of branch-wide work, collections and team performance.',
                to: '/bm',
              },
              {
                bg: 'bg-[#F3E4D4]',
                label: 'Field operations',
                title: 'Collection officer',
                desc: 'Move from customer visits to saved applications, receipts and follow-up work.',
                to: '/co',
              },
            ].map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={w.to}
                  className={`block ${w.bg} rounded-[22px] p-6 h-full min-h-[260px] flex flex-col transition-transform hover:-translate-y-1 duration-300`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className={`text-[10px] font-medium tracking-wider uppercase ${w.bg.includes('2F3A36') ? 'text-white/60' : 'text-[#7D897F]'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center ${w.bg.includes('2F3A36') ? 'bg-white/15' : 'bg-white/70'}`}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className={`text-[11px] font-medium tracking-wider uppercase mb-2 ${w.bg.includes('2F3A36') ? 'text-white/50' : 'text-[#7D897F]'}`}>
                    {w.label}
                  </p>
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">{w.title}</h3>
                  <p className={`text-sm leading-relaxed flex-1 ${w.bg.includes('2F3A36') ? 'text-white/70' : 'text-[#2F3A36]/75'}`}>
                    {w.desc}
                  </p>
                  <span className={`mt-5 text-sm font-medium inline-flex items-center gap-1 ${w.bg.includes('2F3A36') ? 'text-white/90' : 'text-[#2F3A36]'}`}>
                    Open demo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#7D897F] mb-3">Designed for continuity</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Every handoff stays visible.
            </h2>
            <p className="text-[#7D897F] text-lg leading-relaxed mb-8">
              A group created in the field can become a saved application, an
              active loan, a verified receipt and a meaningful performance signal
              — without losing the thread.
            </p>
            <ul className="space-y-3">
              {[
                '12-stage loan applications with live evidence capture',
                'Branch-exclusive payment providers & virtual accounts',
                'Exact allocation between loan repayment and savings',
                'Strict tenant isolation across every company',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#3D9B6E] shrink-0 mt-0.5" />
                  <span className="text-[#2F3A36]/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-[#2F3A36] p-8 md:p-10 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#5B8A7A]/20 blur-3xl" />
              <p className="text-xs tracking-wider uppercase text-white/50 mb-4">Contact</p>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">Need this infrastructure?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Qatavel is not open for self-registration. Reach out to discuss
                using the platform for your microfinance operations.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/2348154076947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-sm"
                >
                  WhatsApp · 0815 407 6947
                </a>
                <a
                  href="https://wa.me/2347061743252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-sm"
                >
                  WhatsApp · 0706 174 3252
                </a>
                <a
                  href="mailto:corneliusadedejivictor@gmail.com"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-sm"
                >
                  corneliusadedejivictor@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#E2E8E2] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2F3A36] flex items-center justify-center">
              <span className="text-white font-bold text-xs">Q</span>
            </div>
            <span className="font-semibold text-sm">qatavel</span>
            <span className="text-[#A0ABA3] text-sm">· The infrastructure behind smarter lending</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#7D897F]">
            <Link to="/login" className="hover:text-[#2F3A36] transition-colors">Sign in</Link>
            <Link to="/dev" className="hover:text-[#2F3A36] transition-colors">Explore workplaces</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
