export const STORAGE_KEYS_CLICKTRACK = 'clicktracks'; // The key to store clicktracks at in local storage
export const STORAGE_KEYS_DARKMODE = 'dark-mode'; // The key to store the dark mode setting at in local storage
export const CLICKTRACK_MAX_UNSUCCESSFUL_CHECKS = 1000; // The amount of times to attempt the generation of a unique name
export const CLICKTRACK_MAX_BPM = 500; // The maximum BPM the user can set in the controls
export const CLICKTRACK_MIN_BPM = 20; // The minimum BPM the user can set in the controls

// Clicktrack General Defaults

export const CLICKTRACK_DEFAULT_NAME = 'Default Clicktrack';
export const CLICKTRACK_DEFAULT_POSITION = -1;
export const CLICKTRACK_DEFAULT_PERMANANT = false;
export const CLICKTRACK_DEFAULT_MASTER_VOLUME = 100; // Default master volume percentage
export const CLICKTRACK_DEFAULT_NOTE: [note: string, octave: number] = ['C', 5];
export const CLICKTRACK_DEFAULT_MUTED = false;
export const CLICKTRACK_DEFAULT_NOTE_DURATION = 1;
export const CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT = true;
export const CLICKTRACK_DEFAULT_SECTION_TYPE = 'metronome';

// Metronome Defaults

export const METRONOME_DEFAULT_BPM = 120;
export const METRONOME_DEFAULT_TIME_SIGNATURE: [beats: number, value: number] =
  [4, 4];
export const METRONOME_DEFAULT_LENGTH = 2;

// Repeat Defaults

export const REPEAT_DEFAULT_TIMES = 1;
export const REPEAT_DEFAULT_INFINITE = true;
