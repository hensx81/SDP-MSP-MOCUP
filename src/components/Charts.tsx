interface ChartDatum {
  label: string;
  value: number;
}

export function BarChart({ data, suffix = '' }: { data: ChartDatum[]; suffix?: string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="grid grid-cols-[84px_1fr_48px] items-center gap-3 text-sm">
          <span className="truncate font-medium text-slate-600">{item.label}</span>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-cyan-400" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
          <span className="text-right font-semibold text-slate-900">{item.value}{suffix}</span>
        </div>
      ))}
    </div>
  );
}
