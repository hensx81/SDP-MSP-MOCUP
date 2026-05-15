# Portal VIP - Entidades Financieras

Mockup funcional, navegable y responsive para validar un piloto de portal VIP inspirado en una operación ServiceDesk Plus MSP Professional Edition para el segmento **Entidades Financieras**.

> Este proyecto no implementa backend, autenticación real ni integración con ServiceDesk Plus MSP. Toda la información es mock/local y se mantiene en memoria durante la sesión del navegador.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Datos mock en `src/data/mockData.ts`
- Selector de rol para simular permisos y experiencia por perfil

## Roles simulados

1. **Solicitante VIP**
   - Visualiza únicamente sus solicitudes mock.
   - Accede a la categoría `Servicios VIP - Entidades Financieras`.
   - Crea solicitudes desde un formulario simplificado.

2. **Agente N1 VIP**
   - Consulta cola VIP con filtros por estado, SLA, cliente y producto.
   - Identifica badges VIP y Entidad Financiera.
   - Cambia estado, grupo, prioridad, agrega notas internas y cierra solicitudes con código mock.

3. **Supervisor**
   - Visualiza KPIs, backlog, SLA, escalamiento y carga operativa con datos mock.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

Luego abre la URL local que imprima Vite, normalmente `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

## Estructura principal

```text
src/
├── App.tsx                  # Layout, navegación por rol y vistas principales
├── components/
│   ├── Badges.tsx           # Badges de estado, prioridad, SLA y VIP
│   ├── Cards.tsx            # Tarjetas KPI y contenedores de sección
│   └── Charts.tsx           # Gráficos simples con barras CSS
├── data/
│   └── mockData.ts          # Catálogo, productos, tickets y KPIs mock
├── types/
│   └── models.ts            # Tipos TypeScript del dominio mock
└── styles.css               # Tailwind y estilos base
```

## Reglas de negocio simuladas

- El solicitante VIP solo ve tickets asociados al requester mock `req-vip-001`.
- El catálogo del solicitante muestra únicamente servicios del segmento VIP de entidades financieras.
- Campos internos como categoría, grupo, prioridad, segmento, técnico y SLA no son editables por el solicitante.
- Al crear una solicitud, se simula el enrutamiento automático a:
  - Estado: `Nuevo`
  - Prioridad: `Alta`
  - Segmento: `VIP Entidades Financieras`
  - Cliente: `Entidad Financiera Demo`
  - Grupo: `N1 VIP Entidades Financieras`
  - Técnico: `Agente VIP Principal`
  - SLA: `SLA VIP EF`

## Alcance y limitaciones

- No hay persistencia en servidor; los cambios se pierden al recargar la página.
- No se usan APIs reales de ServiceDesk Plus MSP.
- Los KPIs son demostrativos; algunos requieren definición operativa y reportes personalizados en una implementación real.
