import { MetricCards } from './Controls';
const statMetrics = [
  ['comparisons', 'Vergleiche'],
  ['moves', 'Moves'],
  ['steps', 'Schritte'],
  ['writes', 'Schreibzugriffe'],
  ['swaps', 'Vertauschungen']
];
export function StatsPanel({ visualState, generationTimeMs }) {
  return (
    <aside className="panel stats-panel" aria-labelledby="stats-title">
      <div className="panel-head">
        <p className="section-kicker">Messwerte</p>
        <h2 id="stats-title">Operationen</h2>
        <p>Live-Werte des aktuell dargestellten Ereignisses.</p>
      </div>
      <div className="stats-grid">
        <MetricCards metrics={statMetrics} values={visualState.stats} className="stat-card" />
        <article className="stat-card">
          <span>Generierungszeit</span>
          <strong>{generationTimeMs} ms</strong>
        </article>
      </div>
    </aside>
  );
}
