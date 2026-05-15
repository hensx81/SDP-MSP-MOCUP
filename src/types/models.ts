export type Role = 'requester' | 'agent' | 'supervisor';
export type TicketStatus = 'Nuevo' | 'En atención' | 'Pendiente de cliente' | 'Escalado N2' | 'Cerrado' | 'Reabierto';
export type Priority = 'Crítica' | 'Alta' | 'Media' | 'Baja';
export type SlaState = 'En tiempo' | 'En riesgo' | 'Vencido';

export interface Ticket {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  client: string;
  segment: string;
  service: string;
  product: string;
  paymentReference: string;
  transactionDate: string;
  amount?: number;
  description: string;
  status: TicketStatus;
  priority: Priority;
  sla: string;
  slaState: SlaState;
  group: string;
  assignedTo: string;
  channel: 'Portal VIP' | 'Correo' | 'Teléfono' | 'Integración mock';
  category: string;
  attachments: string[];
  lastUpdate: string;
  createdAt: string;
  history: TicketHistory[];
  internalNotes: InternalNote[];
  closureCode?: string;
}

export interface TicketHistory {
  date: string;
  actor: string;
  action: string;
}

export interface InternalNote {
  date: string;
  author: string;
  note: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: string;
}
