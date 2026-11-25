import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function OwnerLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (username.trim() && password.trim()) {
        navigate('/owner')
      } else {
        setError('Enter username and password')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-[#2F3A36]">
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[#5B8A7A]/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#C5DCE0]/10 blur-[90px]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center font-bold text-sm">
              Q
            </div>
            <span className="font-semibold tracking-tight">qatavel</span>
          </Link>
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-4">
              Infrastructure<br />control plane
            </h1>
            <p className="text-white/60 text-lg max-w-sm leading-relaxed">
              Sign in to manage companies, monitor platform health and provision new tenants.
            </p>
          </div>
          <p className="text-sm text-white/40">
            The infrastructure behind smarter lending.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#7D897F] hover:text-[#2F3A36] mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </Link>

          <h2 className="text-2xl font-semibold tracking-tight mb-1">Sign in</h2>
          <p className="text-[#7D897F] text-sm mb-8">
            Enter your credentials to access the platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#7D897F] mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8E2] text-[#2F3A36] placeholder-[#A0ABA3] focus:outline-none focus:border-[#2F3A36]/40 focus:ring-2 focus:ring-[#2F3A36]/10 transition-all"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7D897F] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8E2] text-[#2F3A36] placeholder-[#A0ABA3] focus:outline-none focus:border-[#2F3A36]/40 focus:ring-2 focus:ring-[#2F3A36]/10 transition-all pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0ABA3] hover:text-[#7D897F]"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#A0ABA3] cursor-not-allowed"
                title="Available after TOTP setup"
              >
                Forgot password?
              </button>
            </div>

            {error && <p className="text-sm text-[#C45C5C]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#2F3A36] text-white font-medium hover:bg-[#1F2824] disabled:opacity-60 transition-all"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-[#A0ABA3]">
            For exploration use{' '}
            <Link to="/dev" className="text-[#2F3A36] font-medium hover:underline">
              Dev Access
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
