// QATAVEL Core Types — mirrors the Product Vision logical data model

export type Role = 'owner' | 'company' | 'bm' | 'co';

export type WorkerRole = 'BM' | 'CO';

export type LoanStatus = 'DRAFT' | 'SUBMITTED' | 'ACTIVE' | 'COMPLETED' | 'CLOSED';

export type ReceiptStatus = 'AWAITING_ALLOCATION' | 'POSTED';

export type ProvisioningStatus = 'PENDING' | 'RETRYING' | 'CREATED' | 'FAILED';

export type CustomerStatus = 'ACTIVE' | 'CLOSED' | 'REOPENED';

export type ProviderCode = 'monnify' | 'paystack' | 'flutterwave' | '9japay';

export interface Company {
  id: string;
  name: string;
  slug: string;
  gmail: string;
  address: string;
  domain?: string;
  url: string;
  status: 'active' | 'suspended' | 'deactivated';
  createdAt: string;
  branchCount: number;
  workerCount: number;
  health: 'healthy' | 'warning' | 'critical';
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  slug: string;
  address: string;
  url: string;
  createdAt: string;
  workerCount: number;
  activeLoans: number;
  expectedToday: number;
  realisedToday: number;
  health: 'healthy' | 'warning' | 'critical';
  provider?: ProviderConnection;
}

export interface ProviderConnection {
  id: string;
  branchId: string;
  provider: ProviderCode;
  status: 'connected' | 'disconnected' | 'failed' | 'testing';
  webhookEndpoint: string;
  lastTestedAt?: string;
  config: Record<string, string>; // encrypted in real system
}

export interface Worker {
  id: string; // stable worker_id
  branchId: string;
  companyId: string;
  role: WorkerRole;
  status: 'active' | 'suspended' | 'deactivated';
  currentIdentityId: string;
  username: string;
  createdAt: string;
  // performance (computed)
  expectedToday?: number;
  realisedToday?: number;
  achievementPct?: number;
  portfolioSize?: number;
}

export interface WorkerIdentity {
  id: string;
  workerId: string;
  fullName: string;
  phone: string;
  passportUrl?: string;
  validFrom: string;
  validTo?: string;
  isCurrent: boolean;
}

export interface Group {
  id: string;
  companyId: string;
  branchId: string;
  name: string;
  number: string;
  address: string;
  currentOwnerWorkerId: string;
  originalCreatorIdentityId: string;
  memberCount: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  companyId: string;
  branchId: string;
  fullName: string;
  phone: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  status: CustomerStatus;
  currentOwnerWorkerId: string;
  originalCreatorIdentityId: string;
  savingsBalance: number;
  hasActiveLoan: boolean;
  virtualAccount?: VirtualAccount;
  createdAt: string;
}

export interface VirtualAccount {
  accountNumber: string;
  accountName: string;
  bankName: string;
  providerRef: string;
  provider: ProviderCode;
  status: ProvisioningStatus;
  createdAt: string;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  groupId?: string;
  companyId: string;
  branchId: string;
  currentOwnerWorkerId: string;
  stage: number; // 1-12
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'CONFIRMED';
  repaymentMode: 'WEEKLY' | 'DAILY';
  requestedAmount: number;
  purpose?: string;
  // captured data omitted for brevity; full stage data lives in form state
  createdAt: string;
  submittedAt?: string;
  confirmedAt?: string;
}

export interface Loan {
  id: string;
  applicationId: string;
  customerId: string;
  companyId: string;
  branchId: string;
  currentOwnerWorkerId: string;
  status: LoanStatus;
  principal: number;
  interestPct: number;
  totalRepayable: number;
  outstanding: number;
  repaymentMode: 'WEEKLY' | 'DAILY';
  period: number;
  amountPerPeriod: number;
  firstDueDate: string;
  disbursementDate: string;
  virtualAccountStatus: ProvisioningStatus;
  createdAt: string;
}

export interface ScheduleRow {
  id: string;
  loanId: string;
  dueDate: string;
  principal: number;
  interest: number;
  total: number;
  status: 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE';
  paidAmount: number;
}

export interface PaymentReceipt {
  id: string;
  providerConnectionId: string;
  providerTransactionRef: string;
  customerId: string;
  branchId: string;
  amount: number;
  status: ReceiptStatus;
  receivedAt: string;
  allocatedAt?: string;
  allocatedByWorkerId?: string;
}

export interface PaymentAllocation {
  id: string;
  receiptId: string;
  customerId: string;
  loanId?: string;
  loanAllocation: number;
  savingsAllocation: number;
  actorWorkerId: string;
  postedAt: string;
}

export interface Notification {
  id: string;
  recipientWorkerId: string;
  title: string;
  body: string;
  type: 'payment' | 'inactivity' | 'provisioning' | 'system' | 'health';
  read: boolean;
  createdAt: string;
  meta?: Record<string, any>;
}

export interface CompanyHealthWarning {
  id: string;
  companyId: string;
  branchId: string;
  branchName: string;
  type: 'provider_connection' | 'webhook' | 'provisioning_retry' | 'provider_operational';
  message: string;
  severity: 'warning' | 'critical';
  createdAt: string;
}

// Dashboard aggregates
export interface PerformanceSnapshot {
  expected: number;
  realised: number;
  difference: number;
  achievementPct: number;
  outstanding: number;
  overdue: number;
  savingsCollected: number;
  pendingAllocations: number;
}