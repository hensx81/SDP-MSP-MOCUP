import type { ReactNode } from 'react';
import type { Priority, SlaState, TicketStatus } from '../types/models';

const statusStyles: Record<TicketStatus, string> = {
  Nuevo: 'bg-sky-100 text-sky-800 ring-sky-200',
  'En atención': 'bg-blue-100 text-blue-800 ring-blue-200',
  'Pendiente de cliente': 'bg-amber-100 text-amber-800 ring-amber-200',
  'Escalado N2': 'bg-purple-100 text-purple-800 ring-purple-200',
  Cerrado: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  Reabierto: 'bg-rose-100 text-rose-800 ring-rose-200',
};

const priorityStyles: Record<Priority, string> = {
  Crítica: 'bg-red-100 text-red-800 ring-red-200',
  Alta: 'bg-orange-100 text-orange-800 ring-orange-200',
  Media: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
  Baja: 'bg-slate-100 text-slate-700 ring-slate-200',
};

const slaStyles: Record<SlaState, string> = {
  'En tiempo': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'En riesgo': 'bg-amber-50 text-amber-700 ring-amber-200',
  Vencido: 'bg-red-50 text-red-700 ring-red-200',
};

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${className}`}>{children}</span>;
}

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <Badge className={statusStyles[status]}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge className={priorityStyles[priority]}>{priority}</Badge>;
}

export function SlaBadge({ state }: { state: SlaState }) {
  return <Badge className={slaStyles[state]}>SLA {state}</Badge>;
}

export function VipBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-indigo-100 text-indigo-800 ring-indigo-200">VIP</Badge>
      <Badge className="bg-cyan-100 text-cyan-800 ring-cyan-200">Entidad Financiera</Badge>
    </div>
  );
}
