import { useMemo, useState } from 'react';
import { algorithmContent } from '../config/algorithms';
import { DEFAULT_SIZE, DEFAULT_SPEED, createRandomArray } from '../config/datasets';
import { usePlayback } from '../hooks/usePlayback';
import { formatArrayInput, parseArrayInput } from '../utils/arrayInput';
import { runAlgorithm } from '../utils/sortAlgorithms';
import { createIdleFrame, createVisualizationFrames } from '../utils/visualization';
import { Controls } from './Controls';
import { SortVisualizer } from './SortVisualizer';
import { StatsPanel } from './StatsPanel';
import { AlgorithmInfo } from './AlgorithmInfo';
export function VisualizerWorkspace({ active }) {
  const initialArray = useMemo(() => createRandomArray(DEFAULT_SIZE), []);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [baseArray, setBaseArray] = useState(initialArray);
  const [arrayInput, setArrayInput] = useState(() => formatArrayInput(initialArray));
  const [arrayInputError, setArrayInputError] = useState('');
  const playback = usePlayback(speed, active);

  const idleFrame = useMemo(() => createIdleFrame(baseArray), [baseArray]);
  const visualState = playback.currentFrame ?? idleFrame;
  const explanation = algorithmContent[algorithm];
  const arraySize = baseArray.length;
  const primaryActionLabel = playback.isPaused
    ? 'Fortsetzen'
    : playback.isComplete
      ? 'Erneut abspielen'
      : 'Sortierung starten';

  const applyArray = (nextArray) => {
    setBaseArray(nextArray);
    setArrayInput(formatArrayInput(nextArray));
    setArrayInputError('');
    playback.reset();
  };

  const handleApplyInput = () => {
    const result = parseArrayInput(arrayInput);
    if (result.error) {
      setArrayInputError(result.error);
      return;
    }

    applyArray(result.values);
  };

  const handleStart = () => {
    if (playback.isPaused || playback.isComplete) {
      playback.resume();
      return;
    }

    const start = performance.now();
    const frames = createVisualizationFrames(runAlgorithm(algorithm, baseArray));
    const generationTimeMs = Number((performance.now() - start).toFixed(2));
    playback.start(frames, generationTimeMs);
  };

  return (
    <div className="dashboard">
      <Controls
        {...{
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
        }}
      />
      <SortVisualizer
        visualState={visualState}
        title={explanation.title}
        scaleMax={Math.max(...baseArray.map(Math.abs), 1)}
      />
      <div className="single-run-stats">
        <p role="status">
          {playback.isComplete
            ? 'Abgeschlossen'
            : playback.isPlaying
              ? 'Läuft'
              : playback.isPaused
                ? 'Pausiert'
                : 'Bereit'}{' '}
          · {playback.progress}%
        </p>
        <progress max={100} value={playback.progress} aria-label="Sortierfortschritt" />
        <StatsPanel visualState={visualState} generationTimeMs={playback.generationTimeMs} />
      </div>
      <AlgorithmInfo explanation={explanation} />
    </div>
  );
}
