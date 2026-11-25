import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  Briefcase,
  UserCircle,
  ArrowRight,
  Home,
} from 'lucide-react'

const roles = [
  {
    path: '/owner',
    label: 'Infrastructure Owner',
    description: 'Platform health, create/suspend companies, tenant overview',
    icon: Building2,
    color: '#0F969C',
  },
  {
    path: '/company',
    label: 'Company Workplace',
    description: 'Branches, workers, consolidated performance, payment providers, health',
    icon: Users,
    color: '#6DA5C0',
  },
  {
    path: '/bm',
    label: 'Branch Manager',
    description: 'Branch command centre + dual mode (Work as CO)',
    icon: Briefcase,
    color: '#10B981',
  },
  {
    path: '/co',
    label: 'Collection Officer',
    description: 'Portfolio, groups, 12-stage loans, allocation, field work',
    icon: UserCircle,
    color: '#F59E0B',
  },
]

export default function DevAccess() {
  return (
    <div className="min-h-screen bg-[var(--q-deep)] text-[var(--q-text)] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#0F969C] text-sm font-medium tracking-widest uppercase mb-1">
              Development only
            </p>
            <h1 className="text-3xl font-bold">Explore every workplace</h1>
            <p className="text-[#8BA8B0] mt-2">
              No real authentication. Jump into any role to review the UI and workflows.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-[#8BA8B0] hover:text-[#0F969C] transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        <div className="space-y-4">
          {roles.map((role, i) => (
            <motion.div
              key={role.path}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={role.path}
                className="group flex items-center gap-5 p-5 rounded-2xl border border-[#1A3A42] bg-[#0A1F24] hover:border-[#0F969C]/50 hover:bg-[#0C1F24] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${role.color}20` }}
                >
                  <role.icon className="w-6 h-6" style={{ color: role.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg group-hover:text-[#0F969C] transition-colors">
                    {role.label}
                  </h2>
                  <p className="text-sm text-[#8BA8B0]">{role.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#5A7A82] group-hover:text-[#0F969C] group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[#5A7A82]">
          This page exists only for frontend review. Production will use real authentication and role resolution.
        </p>
      </div>
    </div>
  )
}
