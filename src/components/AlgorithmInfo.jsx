import { MetricCards } from './Controls';
const theoryMetrics = [
  ['bestCase', 'Best Case'],
  ['averageCase', 'Average Case'],
  ['worstCase', 'Worst Case'],
  ['spaceComplexity', 'Zusatzspeicher'],
  ['stability', 'Stabilität']
];

export function AlgorithmInfo({ explanation }) {
  return (
    <section className="panel theory-panel" aria-labelledby="theory-title">
      <div className="panel-head">
        <p className="section-kicker">Komplexität</p>
        <h2 id="theory-title">{explanation.title}</h2>
        <p>{explanation.summary}</p>
      </div>
      <div className="theory-grid">
        <MetricCards metrics={theoryMetrics} values={explanation} className="info-card" />
      </div>
    </section>
  );
}
