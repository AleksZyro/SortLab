import { algorithmKeys } from '../utils/sortAlgorithms';
import { algorithmContent } from '../config/algorithms';
import { ARRAY_MIN, ARRAY_MAX, createRandomArray, presetOptions } from '../config/datasets';
const SPEED_MIN = 20;
const SPEED_MAX = 300;
const getAlgorithmLabel = (key) => algorithmContent[key]?.title ?? key;
export const AlgorithmSelect = ({ id, label, value, onChange, disabled = false }) => (
  <label className="field" htmlFor={id}>
    <span>{label}</span>
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    >
      {algorithmKeys.map((key) => (
        <option key={key} value={key}>
          {getAlgorithmLabel(key)}
        </option>
      ))}
    </select>
  </label>
);

export const RangeField = ({
  id,
  label,
  value,
  displayValue = value,
  min,
  max,
  onChange,
  disabled = false
}) => (
  <label className="field" htmlFor={id}>
    <span>
      {label}: <output htmlFor={id}>{displayValue}</output>
    </span>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      disabled={disabled}
    />
  </label>
);

export const PresetButtons = ({ size, onApply, disabled = false, includeRandom = false }) => (
  <>
    {includeRandom && (
      <button
        type="button"
        className="secondary"
        onClick={() => onApply(createRandomArray(size))}
        disabled={disabled}
      >
        Zufällige Werte
      </button>
    )}
    {presetOptions.map((preset) => (
      <button
        key={preset.id}
        type="button"
        className="secondary"
        onClick={() => onApply(preset.create(size))}
        disabled={disabled}
      >
        {preset.label}
      </button>
    ))}
  </>
);

export const MetricCards = ({ metrics, values, className }) => (
  <>
    {metrics.map(([key, label]) => (
      <article className={className} key={key}>
        <span>{label}</span>
        <strong>{values[key]}</strong>
      </article>
    ))}
  </>
);

export function Controls({
  algorithm,
  setAlgorithm,
  playback,
  arraySize,
  applyArray,
  speed,
  setSpeed,
  arrayInput,
  setArrayInput,
  arrayInputError,
  setArrayInputError,
  handleApplyInput,
  handleStart,
  primaryActionLabel
}) {
  return (
    <section className="panel controls-panel" aria-labelledby="controls-title">
      <div className="panel-head">
        <p className="section-kicker">Konfiguration</p>
        <h2 id="controls-title">Steuerung</h2>
        <p>Datensatz und Algorithmus festlegen, danach die Animation kontrollieren.</p>
      </div>

      <AlgorithmSelect
        id="algorithm-select"
        label="Algorithmus"
        value={algorithm}
        disabled={playback.isPlaying}
        onChange={(nextAlgorithm) => {
          setAlgorithm(nextAlgorithm);
          playback.reset();
        }}
      />

      <RangeField
        id="array-size"
        label="Array-Grösse"
        value={arraySize}
        min={ARRAY_MIN}
        max={ARRAY_MAX}
        disabled={playback.isPlaying}
        onChange={(size) => applyArray(createRandomArray(size))}
      />

      <RangeField
        id="speed"
        label="Schrittdauer"
        value={speed}
        displayValue={`${speed} ms`}
        min={SPEED_MIN}
        max={SPEED_MAX}
        onChange={setSpeed}
      />

      <div className="field">
        <label htmlFor="array-input">Eigene Werte</label>
        <textarea
          id="array-input"
          value={arrayInput}
          onChange={(event) => {
            setArrayInput(event.target.value);
            setArrayInputError('');
          }}
          rows={3}
          inputMode="numeric"
          disabled={playback.isPlaying}
          aria-invalid={Boolean(arrayInputError)}
          aria-describedby="array-input-help"
        />
        <p
          id="array-input-help"
          className={arrayInputError ? 'field-error' : 'field-hint'}
          aria-live="polite"
        >
          {arrayInputError || 'Ganze Zahlen mit Komma, Leerschlag oder Semikolon trennen.'}
        </p>
        <button
          type="button"
          className="secondary"
          onClick={handleApplyInput}
          disabled={playback.isPlaying}
        >
          Werte übernehmen
        </button>
      </div>

      <div className="preset-grid" aria-label="Datensatz-Presets">
        <PresetButtons size={arraySize} onApply={applyArray} disabled={playback.isPlaying} />
      </div>

      <div className="button-grid">
        <button
          type="button"
          className="primary"
          onClick={handleStart}
          disabled={playback.isPlaying}
        >
          {primaryActionLabel}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={playback.pause}
          disabled={!playback.isPlaying}
        >
          Pausieren
        </button>
        <button
          type="button"
          className="secondary"
          onClick={playback.reset}
          disabled={!playback.frames.length}
        >
          Zurücksetzen
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => applyArray(createRandomArray(arraySize))}
          disabled={playback.isPlaying}
        >
          Neue Zufallswerte
        </button>
      </div>
      {playback.isPlaying && (
        <p className="lock-note">Datensatz und Algorithmus sind während der Animation gesperrt.</p>
      )}
    </section>
  );
}
