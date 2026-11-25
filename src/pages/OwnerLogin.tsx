import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react'

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

    // Frontend-only mock. Real auth is backend responsibility.
    // For development we accept any non-empty credentials and route to owner.
    setTimeout(() => {
      if (username.trim() && password.trim()) {
        navigate('/owner')
      } else {
        setError('Enter username and password')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[var(--q-deep)] flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05161A] via-[#0C7075]/30 to-[#05161A]" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-[#0F969C]/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#6DA5C0]/10 blur-[120px]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3 text-[#E8F4F5]">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0F969C] to-[#6DA5C0] flex items-center justify-center font-bold text-sm text-[#05161A]">
              Q
            </div>
            <span className="text-xl font-semibold">QATAVEL</span>
          </Link>
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Infrastructure<br />control plane
            </h1>
            <p className="text-[#8BA8B0] text-lg max-w-md">
              Sign in to manage companies, monitor platform health and provision new tenants.
            </p>
          </div>
          <p className="text-sm text-[#5A7A82]">
            The infrastructure behind smarter lending.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#8BA8B0] hover:text-[#0F969C] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-[#0F969C]" />
              <h2 className="text-2xl font-bold">Sign in</h2>
            </div>
            <p className="text-[#8BA8B0] text-sm">
              Enter your credentials to access the platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#8BA8B0] mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0A1F24] border border-[#1A3A42] text-[#E8F4F5] placeholder-[#5A7A82] focus:outline-none focus:border-[#0F969C] focus:ring-1 focus:ring-[#0F969C]/40 transition-all"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8BA8B0] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A1F24] border border-[#1A3A42] text-[#E8F4F5] placeholder-[#5A7A82] focus:outline-none focus:border-[#0F969C] focus:ring-1 focus:ring-[#0F969C]/40 transition-all pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A7A82] hover:text-[#8BA8B0]"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot password — present but not functional yet (per vision) */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#5A7A82] hover:text-[#0F969C] transition-colors cursor-not-allowed"
                title="Available after TOTP setup"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="text-sm text-[#EF4444]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#0F969C] text-[#05161A] font-semibold hover:bg-[#6DA5C0] disabled:opacity-60 transition-all duration-300"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#5A7A82]">
            For development exploration use{' '}
            <Link to="/dev" className="text-[#0F969C] hover:underline">
              Dev Access
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
