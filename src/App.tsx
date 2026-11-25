import { Routes, Route, Navigate } from 'react-router-dom'
import PublicHome from './pages/PublicHome'
import OwnerLogin from './pages/OwnerLogin'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import CompanyDashboard from './pages/company/CompanyDashboard'
import BMDashboard from './pages/bm/BMDashboard'
import CODashboard from './pages/co/CODashboard'
import DevAccess from './pages/DevAccess'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicHome />} />
      <Route path="/login" element={<OwnerLogin />} />

      {/* Development-only role switcher */}
      <Route path="/dev" element={<DevAccess />} />

      {/* Infrastructure Owner */}
      <Route path="/owner/*" element={<OwnerDashboard />} />

      {/* Company Workplace (mock: horizon.qatavel.app) */}
      <Route path="/company/*" element={<CompanyDashboard />} />

      {/* Branch Manager */}
      <Route path="/bm/*" element={<BMDashboard />} />

      {/* Collection Officer */}
      <Route path="/co/*" element={<CODashboard />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
