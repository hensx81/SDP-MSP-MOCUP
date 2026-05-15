import { useState, type FormEvent, type ReactNode } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  CreditCard,
  FilePlus2,
  Headphones,
  LayoutDashboard,
  ListFilter,
  LockKeyhole,
  ShieldCheck,
  TicketCheck,
  UserCog,
  Users,
} from 'lucide-react';
import { Badge, PriorityBadge, SlaBadge, StatusBadge, VipBadges } from './components/Badges';
import { MetricCard, SectionCard } from './components/Cards';
import { BarChart } from './components/Charts';
import { currentRequester, initialTickets, products, serviceCatalog, supervisorMetrics } from './data/mockData';
import type { Priority, Role, SlaState, Ticket, TicketStatus } from './types/models';

type RequesterTab = 'dashboard' | 'catalog' | 'new';
type AgentTab = 'queue' | 'detail';
type SupervisorTab = 'kpis' | 'backlog';

const roleLabels: Record<Role, string> = {
  requester: 'Solicitante VIP',
  agent: 'Agente N1 VIP',
  supervisor: 'Supervisor',
};

const statusOptions: TicketStatus[] = ['Nuevo', 'En atención', 'Pendiente de cliente', 'Escalado N2', 'Cerrado', 'Reabierto'];
const priorityOptions: Priority[] = ['Crítica', 'Alta', 'Media', 'Baja'];
const slaOptions: SlaState[] = ['En tiempo', 'En riesgo', 'Vencido'];
const closureCodes = ['Resuelto en N1', 'Escalado a N2', 'Información insuficiente', 'Rechazado por datos inconsistentes'];

function App() {
  const [role, setRole] = useState<Role>('requester');
  const [requesterTab, setRequesterTab] = useState<RequesterTab>('dashboard');
  const [agentTab, setAgentTab] = useState<AgentTab>('queue');
  const [supervisorTab, setSupervisorTab] = useState<SupervisorTab>('kpis');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(initialTickets[0]?.id ?? '');
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? tickets[0];

  const tabs = role === 'requester'
    ? [
        { id: 'dashboard', label: 'Mi dashboard', icon: LayoutDashboard, onClick: () => setRequesterTab('dashboard'), active: requesterTab === 'dashboard' },
        { id: 'catalog', label: 'Catálogo VIP', icon: CreditCard, onClick: () => setRequesterTab('catalog'), active: requesterTab === 'catalog' },
        { id: 'new', label: 'Nueva solicitud', icon: FilePlus2, onClick: () => setRequesterTab('new'), active: requesterTab === 'new' },
      ]
    : role === 'agent'
      ? [
          { id: 'queue', label: 'Cola VIP', icon: Headphones, onClick: () => setAgentTab('queue'), active: agentTab === 'queue' },
          { id: 'detail', label: 'Detalle ticket', icon: TicketCheck, onClick: () => setAgentTab('detail'), active: agentTab === 'detail' },
        ]
      : [
          { id: 'kpis', label: 'KPIs ejecutivos', icon: BarChart3, onClick: () => setSupervisorTab('kpis'), active: supervisorTab === 'kpis' },
          { id: 'backlog', label: 'Backlog operativo', icon: Users, onClick: () => setSupervisorTab('backlog'), active: supervisorTab === 'backlog' },
        ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-brand-600 p-3 text-white shadow-lg shadow-blue-900/20">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Portal VIP - Entidades Financieras</h1>
                <Badge className="bg-amber-100 text-amber-800 ring-amber-200">Mockup / No productivo</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">Piloto navegable con datos locales: experiencia solicitante, atención N1 y supervisión KPI.</p>
            </div>
          </div>
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700 sm:min-w-64">
            Rol simulado
            <select
              className="focus-ring rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900"
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
            >
              {Object.entries(roleLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft lg:sticky lg:top-28 lg:h-fit">
          <div className="mb-3 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contexto actual</p>
            <p className="mt-1 font-bold text-slate-950">{roleLabels[role]}</p>
            <p className="mt-1 text-sm text-slate-500">{currentRequester.client}</p>
          </div>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`focus-ring flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${tab.active ? 'bg-brand-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-xs text-slate-500">
            <LockKeyhole className="mb-2 h-4 w-4" />
            Sin autenticación real. El selector solo simula permisos de visualización por rol.
          </div>
        </aside>

        <main className="space-y-6">
          {role === 'requester' && (
            <RequesterView
              activeTab={requesterTab}
              tickets={tickets}
              onCreateTicket={(ticket) => {
                setTickets((current) => [ticket, ...current]);
                setSelectedTicketId(ticket.id);
                setRequesterTab('dashboard');
              }}
              onOpenForm={() => setRequesterTab('new')}
            />
          )}
          {role === 'agent' && selectedTicket && (
            <AgentView
              activeTab={agentTab}
              tickets={tickets}
              selectedTicket={selectedTicket}
              onSelect={(id) => {
                setSelectedTicketId(id);
                setAgentTab('detail');
              }}
              onUpdateTicket={(updated) => setTickets((current) => current.map((ticket) => (ticket.id === updated.id ? updated : ticket)))}
            />
          )}
          {role === 'supervisor' && <SupervisorView activeTab={supervisorTab} tickets={tickets} />}
        </main>
      </div>
    </div>
  );
}

function RequesterView({ activeTab, tickets, onCreateTicket, onOpenForm }: { activeTab: RequesterTab; tickets: Ticket[]; onCreateTicket: (ticket: Ticket) => void; onOpenForm: () => void }) {
  // Regla simulada: el solicitante VIP solo consulta tickets propios del requester mock.
  const myTickets = tickets.filter((ticket) => ticket.requesterId === currentRequester.id);
  const pending = myTickets.filter((ticket) => !['Cerrado'].includes(ticket.status)).length;
  const inProgress = myTickets.filter((ticket) => ['Nuevo', 'En atención', 'Reabierto'].includes(ticket.status)).length;
  const closed = myTickets.filter((ticket) => ticket.status === 'Cerrado').length;
  const atRisk = myTickets.filter((ticket) => ticket.slaState === 'En riesgo' || ticket.slaState === 'Vencido').length;

  if (activeTab === 'catalog') {
    return <CatalogView onOpenForm={onOpenForm} />;
  }

  if (activeTab === 'new') {
    return <RequestForm onCreateTicket={onCreateTicket} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Tickets pendientes" value={pending} icon={Clock3} tone="amber" hint="Abiertos, reabiertos o en espera." />
        <MetricCard title="Tickets en atención" value={inProgress} icon={Headphones} tone="blue" hint="Gestionados por N1 VIP." />
        <MetricCard title="Tickets cerrados del mes" value={closed} icon={CheckCircle2} tone="green" hint="Cierres de mayo 2026." />
        <MetricCard title="Próximas a vencimiento SLA" value={atRisk} icon={AlertTriangle} tone="red" hint="Incluye riesgo y vencidos." />
      </div>
      <SectionCard
        title="Mis solicitudes"
        description="Vista filtrada al solicitante VIP; no se muestran tickets de otros clientes ni campos internos editables."
        action={<button onClick={onOpenForm} className="focus-ring rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">Nueva solicitud</button>}
      >
        <TicketTable tickets={myTickets} requesterMode />
      </SectionCard>
    </div>
  );
}

function CatalogView({ onOpenForm }: { onOpenForm: () => void }) {
  // Regla simulada: el catálogo visible se limita a la categoría del segmento VIP Entidades Financieras.
  const vipServices = serviceCatalog.filter((service) => service.category === 'Servicios VIP - Entidades Financieras');
  return (
    <SectionCard title="Catálogo de servicios" description="Categoría única habilitada para el piloto de clientes VIP del segmento financiero.">
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 to-slate-900 p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Categoría visible</p>
        <h2 className="mt-2 text-2xl font-black">Servicios VIP - Entidades Financieras</h2>
        <p className="mt-2 max-w-3xl text-blue-100">Servicios priorizados para pagos, validaciones y soporte de productos financieros en un portal no productivo.</p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {vipServices.map((service) => (
          <article key={service.id} className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-soft">
            <Badge className="bg-blue-50 text-blue-700 ring-blue-200">VIP financiero</Badge>
            <h3 className="mt-4 text-lg font-bold text-slate-950">{service.name}</h3>
            <p className="mt-2 text-sm text-slate-500">{service.description}</p>
            <button onClick={onOpenForm} className="focus-ring mt-5 w-full rounded-xl border border-brand-600 px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50">Solicitar servicio</button>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function RequestForm({ onCreateTicket }: { onCreateTicket: (ticket: Ticket) => void }) {
  const [form, setForm] = useState({ product: products[0], paymentReference: '', transactionDate: '', amount: '', description: '', attachment: '' });
  const [confirmation, setConfirmation] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.paymentReference || !form.transactionDate || !form.description) return;
    const nextId = `VIP-EF-${Math.floor(1100 + Math.random() * 800)}`;
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    // Regla de negocio simulada SDP MSP: categoría, grupo, prioridad, segmento, técnico y SLA se asignan automáticamente.
    const ticket: Ticket = {
      id: nextId,
      requesterId: currentRequester.id,
      requesterName: currentRequester.name,
      requesterEmail: currentRequester.email,
      client: currentRequester.client,
      segment: currentRequester.segment,
      service: serviceCatalog[0].name,
      product: form.product,
      paymentReference: form.paymentReference,
      transactionDate: form.transactionDate,
      amount: form.amount ? Number(form.amount) : undefined,
      description: form.description,
      status: 'Nuevo',
      priority: 'Alta',
      sla: 'SLA VIP EF',
      slaState: 'En tiempo',
      group: 'N1 VIP Entidades Financieras',
      assignedTo: 'Agente VIP Principal',
      channel: 'Portal VIP',
      category: 'Pagos y conciliación',
      attachments: form.attachment ? [form.attachment] : ['adjunto_simulado.pdf'],
      lastUpdate: now,
      createdAt: now,
      history: [{ date: now, actor: 'Portal VIP', action: 'Solicitud creada, marcada como VIP y enrutada automáticamente a N1 VIP.' }],
      internalNotes: [],
    };
    onCreateTicket(ticket);
    setConfirmation(`Solicitud creada correctamente con ID ${nextId}`);
    setForm({ product: products[0], paymentReference: '', transactionDate: '', amount: '', description: '', attachment: '' });
  };

  return (
    <SectionCard title="Formulario de solicitud VIP" description="Campos simplificados para el solicitante. Los datos internos de ITSM se asignan por regla mock.">
      {confirmation ? <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800">{confirmation}</div> : null}
      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-2">
        <Field label="Producto" required>
          <select className="focus-ring w-full rounded-xl border border-slate-300 px-3 py-2" value={form.product} onChange={(event) => setForm({ ...form, product: event.target.value })}>
            {products.map((product) => <option key={product}>{product}</option>)}
          </select>
        </Field>
        <Field label="Referencia de pago" required>
          <input className="focus-ring w-full rounded-xl border border-slate-300 px-3 py-2" value={form.paymentReference} onChange={(event) => setForm({ ...form, paymentReference: event.target.value })} placeholder="Ej: PAY-123456-A" required />
        </Field>
        <Field label="Fecha de transacción" required>
          <input type="date" className="focus-ring w-full rounded-xl border border-slate-300 px-3 py-2" value={form.transactionDate} onChange={(event) => setForm({ ...form, transactionDate: event.target.value })} required />
        </Field>
        <Field label="Monto" hint="Opcional">
          <input type="number" step="0.01" min="0" className="focus-ring w-full rounded-xl border border-slate-300 px-3 py-2" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" />
        </Field>
        <Field label="Descripción" required className="lg:col-span-2">
          <textarea className="focus-ring min-h-32 w-full rounded-xl border border-slate-300 px-3 py-2" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe el caso y el impacto operativo." required />
        </Field>
        <Field label="Adjuntos" hint="Carga visual simulada" className="lg:col-span-2">
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <FilePlus2 className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-2 text-sm font-semibold text-slate-700">Arrastra archivos o registra un nombre de adjunto simulado</p>
            <input className="focus-ring mt-4 w-full max-w-md rounded-xl border border-slate-300 bg-white px-3 py-2" value={form.attachment} onChange={(event) => setForm({ ...form, attachment: event.target.value })} placeholder="comprobante.pdf" />
          </div>
        </Field>
        <div className="lg:col-span-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
          Asignación automática mock: Estado Nuevo · Prioridad Alta · Segmento VIP Entidades Financieras · Grupo N1 VIP Entidades Financieras · Técnico Agente VIP Principal · SLA VIP EF.
        </div>
        <button className="focus-ring rounded-xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700 lg:col-span-2">Guardar solicitud VIP</button>
      </form>
    </SectionCard>
  );
}

function AgentView({ activeTab, tickets, selectedTicket, onSelect, onUpdateTicket }: { activeTab: AgentTab; tickets: Ticket[]; selectedTicket: Ticket; onSelect: (id: string) => void; onUpdateTicket: (ticket: Ticket) => void }) {
  const [filters, setFilters] = useState({ status: 'Todos', sla: 'Todos', client: 'Todos', product: 'Todos' });
  const filtered = tickets.filter((ticket) =>
    (filters.status === 'Todos' || ticket.status === filters.status) &&
    (filters.sla === 'Todos' || ticket.slaState === filters.sla) &&
    (filters.client === 'Todos' || ticket.client === filters.client) &&
    (filters.product === 'Todos' || ticket.product === filters.product),
  );

  if (activeTab === 'detail') {
    return <TicketDetail ticket={selectedTicket} onUpdateTicket={onUpdateTicket} />;
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Cola de tickets VIP" description="Tickets asignados o visibles para el grupo N1 VIP Entidades Financieras.">
        <div className="mb-5 grid gap-3 md:grid-cols-4">
          <FilterSelect label="Estado" value={filters.status} options={['Todos', ...statusOptions]} onChange={(value) => setFilters({ ...filters, status: value })} />
          <FilterSelect label="SLA" value={filters.sla} options={['Todos', ...slaOptions]} onChange={(value) => setFilters({ ...filters, sla: value })} />
          <FilterSelect label="Cliente" value={filters.client} options={['Todos', currentRequester.client]} onChange={(value) => setFilters({ ...filters, client: value })} />
          <FilterSelect label="Producto" value={filters.product} options={['Todos', ...products]} onChange={(value) => setFilters({ ...filters, product: value })} />
        </div>
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <button key={ticket.id} onClick={() => onSelect(ticket.id)} className="focus-ring w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand-200 hover:shadow-soft">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-950">{ticket.id}</span>
                    <VipBadges />
                    <StatusBadge status={ticket.status} />
                    <SlaBadge state={ticket.slaState} />
                  </div>
                  <p className="mt-2 font-semibold text-slate-800">{ticket.service}</p>
                  <p className="mt-1 text-sm text-slate-500">{ticket.client} · {ticket.product} · Ref. {ticket.paymentReference}</p>
                </div>
                <div className="text-sm text-slate-500 lg:text-right">
                  <PriorityBadge priority={ticket.priority} />
                  <p className="mt-2">Asignado a {ticket.assignedTo}</p>
                  <p>Actualizado {ticket.lastUpdate}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function TicketDetail({ ticket, onUpdateTicket }: { ticket: Ticket; onUpdateTicket: (ticket: Ticket) => void }) {
  const [draft, setDraft] = useState({ status: ticket.status, group: ticket.group, priority: ticket.priority, note: '', closureCode: ticket.closureCode ?? closureCodes[0] });

  const update = (changes: Partial<Ticket>, action: string) => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    onUpdateTicket({
      ...ticket,
      ...changes,
      lastUpdate: now,
      history: [{ date: now, actor: 'Agente VIP Principal', action }, ...ticket.history],
    });
  };

  const saveChanges = () => update({ status: draft.status, group: draft.group, priority: draft.priority }, `Actualización operativa: estado ${draft.status}, grupo ${draft.group}, prioridad ${draft.priority}.`);
  const addNote = () => {
    if (!draft.note.trim()) return;
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    onUpdateTicket({ ...ticket, internalNotes: [{ date: now, author: 'Agente VIP Principal', note: draft.note }, ...ticket.internalNotes], lastUpdate: now });
    setDraft({ ...draft, note: '' });
  };
  const closeTicket = () => update({ status: 'Cerrado', closureCode: draft.closureCode, slaState: ticket.slaState === 'Vencido' ? 'Vencido' : 'En tiempo' }, `Solicitud cerrada con código: ${draft.closureCode}.`);

  return (
    <div className="space-y-6">
      <SectionCard title={`Detalle ${ticket.id}`} description="Ficha de atención N1 con datos del solicitante, pago, adjuntos, historial y acciones simuladas.">
        <div className="mb-5 flex flex-wrap gap-2"><VipBadges /><StatusBadge status={ticket.status} /><PriorityBadge priority={ticket.priority} /><SlaBadge state={ticket.slaState} /></div>
        <div className="grid gap-5 xl:grid-cols-3">
          <InfoPanel title="Solicitante" rows={[['Nombre', ticket.requesterName], ['Email', ticket.requesterEmail], ['Cliente', ticket.client], ['Segmento', ticket.segment]]} />
          <InfoPanel title="Datos de pago" rows={[['Producto', ticket.product], ['Referencia', ticket.paymentReference], ['Fecha transacción', ticket.transactionDate], ['Monto', ticket.amount ? ticket.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : 'No informado']]} />
          <InfoPanel title="Asignación" rows={[['Grupo', ticket.group], ['Técnico', ticket.assignedTo], ['SLA', ticket.sla], ['Canal', ticket.channel]]} />
        </div>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <h3 className="font-bold text-slate-950">Descripción</h3>
          <p className="mt-2 text-sm text-slate-600">{ticket.description}</p>
          <h3 className="mt-4 font-bold text-slate-950">Adjuntos simulados</h3>
          <div className="mt-2 flex flex-wrap gap-2">{ticket.attachments.length ? ticket.attachments.map((file) => <Badge key={file} className="bg-white text-slate-700 ring-slate-200">{file}</Badge>) : <span className="text-sm text-slate-500">Sin adjuntos</span>}</div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <SectionCard title="Historial y notas internas">
          <div className="grid gap-5 lg:grid-cols-2">
            <Timeline title="Historial de cambios" items={ticket.history.map((item) => `${item.date} · ${item.actor}: ${item.action}`)} />
            <Timeline title="Notas internas" items={ticket.internalNotes.map((item) => `${item.date} · ${item.author}: ${item.note}`)} empty="Sin notas internas." />
          </div>
        </SectionCard>
        <SectionCard title="Acciones del agente">
          <div className="space-y-4">
            <FilterSelect label="Cambiar estado" value={draft.status} options={statusOptions} onChange={(value) => setDraft({ ...draft, status: value as TicketStatus })} />
            <FilterSelect label="Reasignar grupo" value={draft.group} options={['N1 VIP Entidades Financieras', 'N2 Aplicaciones Financieras', 'Mesa de Control VIP']} onChange={(value) => setDraft({ ...draft, group: value })} />
            <FilterSelect label="Prioridad" value={draft.priority} options={priorityOptions} onChange={(value) => setDraft({ ...draft, priority: value as Priority })} />
            <button onClick={saveChanges} className="focus-ring w-full rounded-xl bg-brand-600 px-4 py-2 font-bold text-white hover:bg-brand-700">Guardar cambios</button>
            <div>
              <label className="text-sm font-bold text-slate-700">Nota interna</label>
              <textarea className="focus-ring mt-1 min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2" value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} placeholder="Comentario visible solo para soporte." />
              <button onClick={addNote} className="focus-ring mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 font-bold text-slate-700 hover:bg-slate-50">Agregar nota</button>
            </div>
            <FilterSelect label="Código de cierre mock" value={draft.closureCode} options={closureCodes} onChange={(value) => setDraft({ ...draft, closureCode: value })} />
            <button onClick={closeTicket} className="focus-ring w-full rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700">Cerrar solicitud</button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function SupervisorView({ activeTab, tickets }: { activeTab: SupervisorTab; tickets: Ticket[] }) {
  const backlog = tickets.filter((ticket) => ticket.status !== 'Cerrado').length;

  if (activeTab === 'backlog') {
    return (
      <SectionCard title="Backlog por agente y grupo" description="Carga operativa mock para planeación del piloto VIP.">
        <BacklogTable />
      </SectionCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Total tickets recibidos" value={supervisorMetrics.totalReceived} icon={TicketCheck} tone="blue" />
        <MetricCard title="Tickets por canal" value="4" hint={supervisorMetrics.ticketsByChannel} icon={ListFilter} tone="slate" />
        <MetricCard title="Primera respuesta" value={supervisorMetrics.firstResponseAvg} icon={Clock3} tone="green" />
        <MetricCard title="Resolución promedio" value={supervisorMetrics.resolutionAvg} icon={CheckCircle2} tone="blue" />
        <MetricCard title="% FCR" value={supervisorMetrics.fcr} icon={ShieldCheck} tone="green" />
        <MetricCard title="% escalados" value={supervisorMetrics.escalated} icon={UserCog} tone="amber" />
        <MetricCard title="Tickets vencidos SLA" value={supervisorMetrics.slaBreached} icon={AlertTriangle} tone="red" />
        <MetricCard title="Tickets en riesgo SLA" value={supervisorMetrics.slaAtRisk} icon={AlertTriangle} tone="amber" />
        <MetricCard title="Backlog total" value={backlog || supervisorMetrics.backlog} icon={Headphones} tone="blue" />
        <MetricCard title="Reaperturas" value={supervisorMetrics.reopenings} icon={TicketCheck} tone="red" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Tickets por día"><BarChart data={supervisorMetrics.ticketsByDay} /></SectionCard>
        <SectionCard title="Tickets por categoría interna"><BarChart data={supervisorMetrics.byCategory} /></SectionCard>
        <SectionCard title="Tickets por agente"><BarChart data={supervisorMetrics.byAgent} /></SectionCard>
        <SectionCard title="Cumplimiento SLA"><BarChart data={supervisorMetrics.slaCompliance} suffix="%" /></SectionCard>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
        <p className="font-bold">Nota de alcance</p>
        <p className="mt-1 text-sm">Algunos KPIs requieren definición operativa y reportes personalizados en SDP MSP.</p>
      </div>
    </div>
  );
}

function TicketTable({ tickets, requesterMode = false }: { tickets: Ticket[]; requesterMode?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
          <tr>
            {['ID', 'Servicio', 'Producto', 'Referencia de pago', 'Fecha de transacción', 'Estado', 'SLA', 'Última actualización'].map((header) => <th key={header} className="px-4 py-3">{header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-4 font-bold text-brand-700">{ticket.id}</td>
              <td className="min-w-64 px-4 py-4 text-slate-700">{ticket.service}</td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-600">{ticket.product}</td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-600">{ticket.paymentReference}</td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-600">{ticket.transactionDate}</td>
              <td className="whitespace-nowrap px-4 py-4"><StatusBadge status={ticket.status} /></td>
              <td className="whitespace-nowrap px-4 py-4"><SlaBadge state={ticket.slaState} /></td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-500">{ticket.lastUpdate}{requesterMode ? '' : ` · ${ticket.assignedTo}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BacklogTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
          <tr><th className="px-4 py-3">Agente</th><th className="px-4 py-3">Grupo</th><th className="px-4 py-3">Abiertos</th><th className="px-4 py-3">En riesgo</th><th className="px-4 py-3">Vencidos</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {supervisorMetrics.backlogTable.map((row) => (
            <tr key={`${row.agent}-${row.group}`}>
              <td className="px-4 py-4 font-semibold text-slate-900">{row.agent}</td>
              <td className="px-4 py-4 text-slate-600">{row.group}</td>
              <td className="px-4 py-4 font-bold text-slate-900">{row.open}</td>
              <td className="px-4 py-4 text-amber-700">{row.atRisk}</td>
              <td className="px-4 py-4 text-red-700">{row.breached}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Field({ label, required, hint, children, className = '' }: { label: string; required?: boolean; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 flex items-center gap-2 text-sm font-bold text-slate-700">{label}{required ? <span className="text-red-600">*</span> : null}{hint ? <span className="font-normal text-slate-400">{hint}</span> : null}</span>
      {children}
    </label>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold text-slate-700">{label}</span>
      <select className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function InfoPanel({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <dl className="mt-3 space-y-3">
        {rows.map(([key, value]) => (
          <div key={key}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{key}</dt>
            <dd className="text-sm font-medium text-slate-700">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Timeline({ title, items, empty = 'Sin eventos.' }: { title: string; items: string[]; empty?: string }) {
  return (
    <div>
      <h3 className="font-bold text-slate-950">{title}</h3>
      <div className="mt-3 space-y-3">
        {items.length ? items.map((item) => <div key={item} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{item}</div>) : <p className="text-sm text-slate-500">{empty}</p>}
      </div>
    </div>
  );
}

export default App;
