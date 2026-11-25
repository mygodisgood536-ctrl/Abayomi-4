import { cn } from '../../utils/cn'

const styles: Record<string, string> = {
  active: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
  healthy: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
  connected: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
  suspended: 'bg-[#D4A017]/12 text-[#D4A017]',
  warning: 'bg-[#D4A017]/12 text-[#D4A017]',
  pending: 'bg-[#D4A017]/12 text-[#D4A017]',
  RETRYING: 'bg-[#D4A017]/12 text-[#D4A017]',
  deactivated: 'bg-[#C45C5C]/12 text-[#C45C5C]',
  critical: 'bg-[#C45C5C]/12 text-[#C45C5C]',
  failed: 'bg-[#C45C5C]/12 text-[#C45C5C]',
  FAILED: 'bg-[#C45C5C]/12 text-[#C45C5C]',
  CREATED: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
  AWAITING_ALLOCATION: 'bg-[#D4A017]/12 text-[#D4A017]',
  POSTED: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
  ACTIVE: 'bg-[#3D9B6E]/12 text-[#3D9B6E]',
  COMPLETED: 'bg-[#5B8FA8]/12 text-[#5B8FA8]',
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        styles[status] ?? 'bg-[#A0ABA3]/15 text-[#7D897F]',
        className
      )}
    >
      {status.replace(/_/g, ' ').toLowerCase()}
    </span>
  )
}
