import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'

const roles = [
  {
    path: '/owner',
    label: 'Infrastructure Owner',
    description: 'Platform health, create and manage companies',
    num: '01',
    bg: 'bg-[#2F3A36] text-white',
    muted: 'text-white/50',
  },
  {
    path: '/company',
    label: 'Company Workplace',
    description: 'Branches, workers, providers, consolidated performance',
    num: '02',
    bg: 'bg-[#C5DCE0]',
    muted: 'text-[#5A6B66]',
  },
  {
    path: '/bm',
    label: 'Branch Manager',
    description: 'Branch command centre + dual Work as CO mode',
    num: '03',
    bg: 'bg-[#D4EDE0]',
    muted: 'text-[#5A6B66]',
  },
  {
    path: '/co',
    label: 'Collection Officer',
    description: 'Portfolio, groups, 12-stage loans, allocation',
    num: '04',
    bg: 'bg-[#F3E4D4]',
    muted: 'text-[#5A6B66]',
  },
]

export default function DevAccess() {
  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#2F3A36] px-6 py-14">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#7D897F] mb-2">
              Development access
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Explore every workplace</h1>
            <p className="text-[#7D897F] mt-2 text-[15px]">
              No real authentication. Jump into any role to review the product.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-[#7D897F] hover:text-[#2F3A36] transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        <div className="space-y-3">
          {roles.map((role, i) => (
            <motion.div
              key={role.path}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={role.path}
                className={`group flex items-center gap-5 p-5 rounded-[20px] ${role.bg} transition-transform hover:-translate-y-0.5 duration-300`}
              >
                <span className={`text-xs font-medium ${role.muted}`}>{role.num}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-[17px] tracking-tight">{role.label}</h2>
                  <p className={`text-sm mt-0.5 ${role.muted}`}>{role.description}</p>
                </div>
                <span className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  role.bg.includes('2F3A36') ? 'bg-white/15' : 'bg-white/70'
                } group-hover:scale-105 transition-transform`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
