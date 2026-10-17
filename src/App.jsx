import { useState } from 'react';
import { VisualizerWorkspace } from './components/VisualizerWorkspace';
import { ComparisonPanel } from './components/ComparisonPanel';
const PRIVACY_URL = `${import.meta.env.BASE_URL}privacy.html`;
const views = [
  ['visualizer', 'Visualisierung'],
  ['compare', 'Vergleich']
];
export default function App() {
  const [activeTab, setActiveTab] = useState('visualizer');
  const selectWithKeyboard = (event, index) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') nextIndex = 1 - index;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = 1;
    else return;
    event.preventDefault();
    setActiveTab(views[nextIndex][0]);
    document.getElementById(views[nextIndex][0] + '-tab').focus();
  };
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Zum Hauptinhalt springen
      </a>
      <header className="hero-card">
        <div>
          <p className="eyebrow">Interaktives Algorithmus-Labor</p>
          <h1>SortLab</h1>
          <p className="hero-copy">
            Sortierverfahren verstehen. Schritte beobachten. Algorithmen direkt vergleichen.
          </p>
        </div>
        <span className="header-note">6 Algorithmen · Ein gemeinsamer Input</span>
      </header>
      <nav className="mode-tabs" aria-label="Arbeitsbereich" role="tablist">
        {views.map(([key, label], index) => (
          <button
            key={key}
            id={key + '-tab'}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={key + '-view'}
            tabIndex={activeTab === key ? 0 : -1}
            className={activeTab === key ? 'active' : ''}
            onClick={() => setActiveTab(key)}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
          >
            {label}
          </button>
        ))}
      </nav>
      <main id="main-content" tabIndex={-1}>
        <section
          id="visualizer-view"
          role="tabpanel"
          aria-labelledby="visualizer-tab"
          hidden={activeTab !== 'visualizer'}
        >
          <VisualizerWorkspace active={activeTab === 'visualizer'} />
        </section>
        <section
          id="compare-view"
          role="tabpanel"
          aria-labelledby="compare-tab"
          hidden={activeTab !== 'compare'}
        >
          <ComparisonPanel active={activeTab === 'compare'} />
        </section>
      </main>
      <footer className="app-footer">
        <span>Alle Berechnungen erfolgen lokal im Browser.</span>
        <a href={PRIVACY_URL}>Datenschutz</a>
      </footer>
    </div>
  );
}
