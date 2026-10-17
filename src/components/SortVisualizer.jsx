export function SortVisualizer({ visualState, title, titleId = 'visualizer-title', scaleMax }) {
  const tallestValue = scaleMax ?? Math.max(...visualState.array.map(Math.abs), 1);
  return (
    <section className="panel visualizer-panel" aria-labelledby={titleId}>
      <div className="visualizer-heading">
        <div className="panel-head">
          <p className="section-kicker">Live-Ansicht</p>
          <h2 id={titleId}>{title}</h2>
        </div>
        <span className="action-badge">{visualState.action}</span>
      </div>

      <div className="legend" aria-label="Farblegende">
        <span>
          <i className="legend-dot base" />
          Unverändert
        </span>
        <span>
          <i className="legend-dot compare" />
          Vergleich
        </span>
        <span>
          <i className="legend-dot swap" />
          Geschrieben
        </span>
        <span>
          <i className="legend-dot sorted" />
          Sortierter Bereich
        </span>
      </div>

      <div className="chart-card">
        <div
          className="chart"
          style={{ gridTemplateColumns: `repeat(${visualState.array.length}, minmax(0, 1fr))` }}
          role="img"
          aria-label={`Aktueller Array-Zustand: ${visualState.array.join(', ')}`}
        >
          {visualState.array.map((value, index) => {
            const isCompared = visualState.compared.includes(index);
            const isChanged = visualState.changed.includes(index);
            const isSorted = visualState.sorted.includes(index);
            const normalizedHeight = Math.max((Math.abs(value) / tallestValue) * 100, 8);
            const tone = isChanged ? 'swap' : isCompared ? 'compare' : isSorted ? 'sorted' : 'base';

            return (
              <div key={index} className={`bar-wrap ${tone}`} aria-hidden="true">
                <span className="bar-value">{value}</span>
                <div className={`bar ${tone}`} style={{ height: `${normalizedHeight}%` }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
