import { useEffect, useMemo, useReducer } from 'react';

export const initialPlaybackState = {
  frames: [],
  currentIndex: 0,
  isPlaying: false,
  generationTimeMs: 0
};

export const playbackReducer = (state, action) => {
  switch (action.type) {
    case 'start': {
      const frames = action.frames ?? state.frames;
      if (frames.length <= 1) {
        return { ...state, frames, isPlaying: false };
      }

      const isAtEnd = state.currentIndex >= frames.length - 1;
      return {
        ...state,
        frames,
        currentIndex: action.frames || isAtEnd ? 0 : state.currentIndex,
        generationTimeMs: action.generationTimeMs ?? state.generationTimeMs,
        isPlaying: true
      };
    }
    case 'pause':
      return { ...state, isPlaying: false };
    case 'advance': {
      if (!state.isPlaying || state.frames.length === 0) {
        return state;
      }
      const lastIndex = state.frames.length - 1;
      const nextIndex = Math.min(state.currentIndex + 1, lastIndex);
      return {
        ...state,
        currentIndex: nextIndex,
        isPlaying: nextIndex < lastIndex
      };
    }
    case 'reset':
      return { ...initialPlaybackState };
    default:
      return state;
  }
};

export const usePlayback = (delay, active = true) => {
  const [state, dispatch] = useReducer(playbackReducer, initialPlaybackState);

  useEffect(() => {
    if (!active) {
      dispatch({ type: 'pause' });
      return undefined;
    }
    if (!state.isPlaying) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => dispatch({ type: 'advance' }), delay);
    return () => window.clearTimeout(timeoutId);
  }, [active, delay, state.currentIndex, state.isPlaying]);

  return useMemo(() => {
    const lastIndex = state.frames.length - 1;
    const hasStarted = state.frames.length > 0;
    const isComplete = lastIndex > 0 && state.currentIndex === lastIndex;
    const progress = lastIndex > 0 ? Math.round((state.currentIndex / lastIndex) * 100) : 0;

    return {
      ...state,
      currentFrame: state.frames[state.currentIndex],
      isPaused: hasStarted && !state.isPlaying && !isComplete,
      isComplete,
      progress,
      start: (frames, generationTimeMs) => dispatch({ type: 'start', frames, generationTimeMs }),
      resume: () => dispatch({ type: 'start' }),
      pause: () => dispatch({ type: 'pause' }),
      reset: () => dispatch({ type: 'reset' })
    };
  }, [state]);
};
