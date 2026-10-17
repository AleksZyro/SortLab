import { describe, expect, it } from 'vitest';
import { initialPlaybackState, playbackReducer } from './usePlayback';

const frames = [{ id: 0 }, { id: 1 }, { id: 2 }];

describe('playbackReducer', () => {
  it('ignores stale timer ticks after pause or reset', () => {
    const paused = { frames, currentIndex: 1, isPlaying: false, generationTimeMs: 1 };
    expect(playbackReducer(paused, { type: 'advance' })).toBe(paused);
    expect(playbackReducer(initialPlaybackState, { type: 'advance' })).toBe(initialPlaybackState);
  });

  it('preserves the position when paused immediately after starting', () => {
    const started = playbackReducer(initialPlaybackState, { type: 'start', frames });
    const paused = playbackReducer(started, { type: 'pause' });
    const resumed = playbackReducer(paused, { type: 'start' });
    expect(resumed.currentIndex).toBe(0);
    expect(resumed.isPlaying).toBe(true);
  });
  it('starts a prepared animation from the first frame', () => {
    const state = playbackReducer(initialPlaybackState, {
      type: 'start',
      frames,
      generationTimeMs: 1.25
    });

    expect(state).toEqual({ frames, currentIndex: 0, isPlaying: true, generationTimeMs: 1.25 });
  });

  it('advances and stops on the final frame', () => {
    const started = { frames, currentIndex: 1, isPlaying: true, generationTimeMs: 1 };
    const finished = playbackReducer(started, { type: 'advance' });

    expect(finished.currentIndex).toBe(2);
    expect(finished.isPlaying).toBe(false);
  });

  it('resumes from a paused frame and restarts after completion', () => {
    const paused = { frames, currentIndex: 1, isPlaying: false, generationTimeMs: 1 };
    const resumed = playbackReducer(paused, { type: 'start' });
    const restarted = playbackReducer({ ...paused, currentIndex: 2 }, { type: 'start' });

    expect(resumed.currentIndex).toBe(1);
    expect(resumed.isPlaying).toBe(true);
    expect(restarted.currentIndex).toBe(0);
  });

  it('resets all playback state', () => {
    const reset = playbackReducer(
      { frames, currentIndex: 2, isPlaying: false, generationTimeMs: 1 },
      { type: 'reset' }
    );

    expect(reset).toEqual(initialPlaybackState);
  });
});
