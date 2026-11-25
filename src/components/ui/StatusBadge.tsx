import { cn } from '../../utils/cn'

const styles: Record<string, string> = {
  active: 'bg-[#10B981]/15 text-[#10B981]',
  healthy: 'bg-[#10B981]/15 text-[#10B981]',
  connected: 'bg-[#10B981]/15 text-[#10B981]',
  suspended: 'bg-[#F59E0B]/15 text-[#F59E0B]',
  warning: 'bg-[#F59E0B]/15 text-[#F59E0B]',
  pending: 'bg-[#F59E0B]/15 text-[#F59E0B]',
  RETRYING: 'bg-[#F59E0B]/15 text-[#F59E0B]',
  deactivated: 'bg-[#EF4444]/15 text-[#EF4444]',
  critical: 'bg-[#EF4444]/15 text-[#EF4444]',
  failed: 'bg-[#EF4444]/15 text-[#EF4444]',
  FAILED: 'bg-[#EF4444]/15 text-[#EF4444]',
  CREATED: 'bg-[#10B981]/15 text-[#10B981]',
  AWAITING_ALLOCATION: 'bg-[#F59E0B]/15 text-[#F59E0B]',
  POSTED: 'bg-[#10B981]/15 text-[#10B981]',
  ACTIVE: 'bg-[#10B981]/15 text-[#10B981]',
  COMPLETED: 'bg-[#6DA5C0]/15 text-[#6DA5C0]',
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        styles[status] ?? 'bg-[#5A7A82]/20 text-[#8BA8B0]',
        className
      )}
    >
      {status.replace(/_/g, ' ').toLowerCase()}
    </span>
  )
}
