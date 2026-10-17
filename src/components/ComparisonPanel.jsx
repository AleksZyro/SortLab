import { useState } from 'react';
import { algorithmContent } from '../config/algorithms';
import {
  ARRAY_MIN,
  ARRAY_MAX,
  DEFAULT_SIZE,
  DEFAULT_SPEED,
  createRandomArray
} from '../config/datasets';
import { usePlayback } from '../hooks/usePlayback';
import { runAlgorithm, summarizeAlgorithmRun } from '../utils/sortAlgorithms';
import { createIdleFrame } from '../utils/visualization';
import { createComparisonTimeline } from '../utils/comparison';
import { AlgorithmSelect, RangeField, PresetButtons } from './Controls';
import { SortVisualizer } from './SortVisualizer';
const metrics = [
  ['comparisons', 'Vergleiche'],
  ['moves', 'Moves'],
  ['steps', 'Schritte'],
  ['writes', 'Schreibzugriffe']
];
export function ComparisonPanel({ active }) {
  const [algorithms, setAlgorithms] = useState(['bubble', 'quick']);
  const [dataset, setDataset] = useState(() => createRandomArray(DEFAULT_SIZE));
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [summaries, setSummaries] = useState([]);
  const playback = usePlayback(speed, active);
  const applyDataset = (values) => {
    setDataset(values);
    setSummaries([]);
    playback.reset();
  };
  const selectAlgorithm = (index, key) => {
    setAlgorithms(algorithms.map((value, i) => (i === index ? key : value)));
    setSummaries([]);
    playback.reset();
  };
  const start = () => {
    if (playback.frames.length) {
      playback.resume();
      return;
    }
    const runs = algorithms.map((key) => runAlgorithm(key, dataset));
    const timeline = createComparisonTimeline(...runs);
    setSummaries(algorithms.map((key) => summarizeAlgorithmRun(key, dataset)));
    playback.start(timeline, 0);
  };
  const timeline = playback.currentFrame;
  return (
    <div className="compare-workspace">
      <section className="panel compare-panel" aria-labelledby="compare-title">
        <div className="panel-head">
          <p className="section-kicker">Gleiche Werte · Gemeinsamer Takt</p>
          <h2 id="compare-title">Algorithmen im direkten Vergleich</h2>
          <p>Ein Ereignis pro Seite und Takt. Fertige Verfahren bleiben im Endzustand stehen.</p>
        </div>
        <div className="compare-controls">
          {algorithms.map((key, index) => (
            <AlgorithmSelect
              key={index}
              id={'compare-algorithm-' + index}
              label={'Algorithmus ' + (index === 0 ? 'A' : 'B')}
              value={key}
              disabled={playback.isPlaying}
              onChange={(value) => selectAlgorithm(index, value)}
            />
          ))}
          <RangeField
            id="compare-size"
            label="Array-Grösse"
            value={dataset.length}
            min={ARRAY_MIN}
            max={ARRAY_MAX}
            disabled={playback.isPlaying}
            onChange={(size) => applyDataset(createRandomArray(size))}
          />
          <RangeField
            id="compare-speed"
            label="Gemeinsame Schrittdauer"
            value={speed}
            displayValue={speed + ' ms'}
            min={20}
            max={300}
            onChange={setSpeed}
          />
        </div>
        <div className="comparison-toolbar">
          <button className="primary" onClick={start} disabled={playback.isPlaying}>
            {playback.isComplete
              ? 'Erneut abspielen'
              : playback.isPaused
                ? 'Fortsetzen'
                : 'Vergleich starten'}
          </button>
          <button onClick={playback.pause} disabled={!playback.isPlaying}>
            Pausieren
          </button>
          <button
            onClick={() => {
              playback.reset();
              setSummaries([]);
            }}
            disabled={!playback.frames.length}
          >
            Zurücksetzen
          </button>
        </div>
        <div className="compare-presets">
          <PresetButtons
            size={dataset.length}
            onApply={applyDataset}
            disabled={playback.isPlaying}
            includeRandom
          />
        </div>
        <details className="array-preview">
          <summary>Gemeinsamer Ausgangsdatensatz ({dataset.length} Werte)</summary>
          <p>{dataset.join(', ')}</p>
        </details>
      </section>
      <div className="comparison-grid">
        {algorithms.map((key, index) => {
          const side = index === 0 ? 'left' : 'right';
          const frame = timeline?.[side] ?? createIdleFrame(dataset);
          const progress = timeline?.[side + 'Progress'] ?? 0;
          const complete = timeline?.[side + 'Complete'] ?? false;
          const status = complete
            ? 'Abgeschlossen'
            : playback.isPlaying
              ? 'Läuft'
              : playback.frames.length
                ? 'Pausiert'
                : 'Bereit';
          return (
            <article
              className="comparison-lane"
              key={side}
              aria-label={'Algorithmus ' + (index === 0 ? 'A' : 'B')}
            >
              <div className="lane-status">
                <span>Algorithmus {index === 0 ? 'A' : 'B'}</span>
                <strong role="status">{status}</strong>
              </div>
              <SortVisualizer
                visualState={frame}
                title={algorithmContent[key].title}
                titleId={'compare-title-' + side}
                scaleMax={Math.max(...dataset.map(Math.abs), 1)}
              />
              <div className="lane-progress">
                <span>{progress}%</span>
                <progress
                  value={progress}
                  max={100}
                  aria-label={'Fortschritt ' + algorithmContent[key].title}
                />
              </div>
              <dl className="lane-metrics">
                {metrics.map(([metric, label]) => (
                  <div key={metric}>
                    <dt>{label}</dt>
                    <dd>{frame.stats[metric]}</dd>
                  </div>
                ))}
              </dl>
              <p className="field-hint">
                Average: {algorithmContent[key].averageCase} · Speicher:{' '}
                {algorithmContent[key].spaceComplexity}
              </p>
              <p className="field-hint">Berechnungszeit: {summaries[index]?.runtimeMs ?? '–'} ms</p>
            </article>
          );
        })}
      </div>
      <p className="measurement-note">
        Die Berechnungszeit enthält Instrumentierung und hängt von Browser, Gerät und Systemlast ab.
        Sie ist kein wissenschaftlicher Benchmark. Moves zählen Vertauschungen oder einzelne
        Schreiboperationen; ein Swap schreibt zwei Werte. Schritte zählen Vergleiche und Moves. Die
        Animationsdauer hängt zusätzlich von den Markierungsereignissen ab.
      </p>
    </div>
  );
}
