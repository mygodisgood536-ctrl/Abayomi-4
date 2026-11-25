# QATAVEL Frontend — Complete Product

Premium frontend for the QATAVEL microfinance infrastructure platform.

## Design system

Selected palette (strongest for trust + data density):

- Deep: #05161A
- Surface: #072E33
- Primary dark: #0C7075
- Primary: #0F969C
- Primary light: #6DA5C0
- Border accent: #294D61

## Quick start

cd qatavel-frontend
npm install
npm run dev

Open http://localhost:5173
Use /dev to jump between every workplace without authentication.

## Complete route map

/ - Cinematic public homepage
/login - Infrastructure Owner login
/dev - Role explorer
/owner - Owner overview + companies
/owner/companies - Company list + create
/owner/companies/:id - Company detail (suspend / deactivate / reactivate)
/company - Company overview + charts
/company/branches - Branch list + create
/company/branches/:id - Branch detail, workers, payment provider
/company/health - Company Health warnings
/company/settings - Password + light/dark
/bm - Branch Manager dashboard
/bm/officers - CO performance list
/bm/officers/:id - Single CO inspection
/bm/groups - Groups view
/co - CO portfolio dashboard
/co/groups - Groups
/co/customers - Customers
/co/customers/:id - Customer profile + VA + savings/loan history
/co/applications/new - 12-stage loan application wizard
/co/disbursement - Confirm external disbursement and activate loan
/co/allocations - Payment allocation (exact tally rule)
/co/notifications - In-app notifications

## Implemented product rules

- No company self-signup on public homepage
- Owner creates company, generates {slug}.qatavel.app + temp password
- Branch creation generates {branch}.{company}.qatavel.app
- Exclusive payment provider per branch (Monnify / Paystack / Flutterwave / 9japay)
- Worker roles: BM + CO only
- Worker name becomes username; meaningful initial password
- 12 saved stages for loan application
- Live face capture UI (camera only)
- Weekly / Daily repayment with tally validation
- Disbursement is external; CO confirmation activates loan immediately
- Virtual account provisioning is async and never blocks activation
- Payment allocation: Loan + Savings = exact receipt amount
- No manual cash collection
- Savings is customer-level running balance
- Daily savings | loan repayment history view
- BM dual mode (Work as CO)
- Company Health with branch-identified warnings
- Tenant isolation reflected in structure and navigation

## Architecture

src/
  components/charts/PerformanceChart.tsx
  components/co/SavingsLoanHistory.tsx
  components/ui/Button.tsx Card.tsx StatusBadge.tsx
  data/mock.ts
  pages/PublicHome.tsx OwnerLogin.tsx DevAccess.tsx
  pages/owner/OwnerDashboard.tsx
  pages/company/CompanyDashboard.tsx
  pages/bm/BMDashboard.tsx
  pages/co/CODashboard.tsx DisbursementConfirm.tsx
  styles/design-tokens.css
  types/index.ts
  utils/cn.ts

## Notes for backend developer

- Types in src/types follow the vision logical data model
- Replace mock services with real API calls; UI contracts are stable
- No production auth or password logic lives in this frontend
- Provider credentials UI is present; encryption and webhook verification are backend

## Vision overrides respected

1. Manual cash prohibited
2. One exclusive provider per branch
3. Finite VA retry (initial, 30 min, retry, 30 min, FAILED)
4. Existing VA details never replaced by failed or incomplete request
5. Product name is QATAVEL everywhere

This is a complete, navigable frontend of the full product.
Run npm install && npm run dev on a stable Node environment to explore every workplace and workflow.
