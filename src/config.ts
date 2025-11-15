import { TNote, TTimeSignature } from './types';

export const DB_USERS_COLLECTION_KEY = 'users';
export const DB_RULE_MAX_CLICKTRACKS = 20;
export const CLICKTRACK_NAME_MAX_LENGTH = 100;
export const CLICKTRACK_NAME_MIN_LENGTH = 1;

export const STORAGE_KEYS_CLICKTRACK = 'clicktracks'; // The key to store clicktracks at in local storage
export const STORAGE_KEYS_DARKMODE = 'dark-mode'; // The key to store the dark mode setting at in local storage
export const CLICKTRACK_MAX_UNSUCCESSFUL_CHECKS = 1000; // The amount of times to attempt the generation of a unique name
export const CLICKTRACK_MAX_BPM = 500; // The maximum BPM the user can set in the controls
export const CLICKTRACK_MIN_BPM = 20; // The minimum BPM the user can set in the controls
export const NOTIFICATION_FADE_AFTER = 5000; // ms

// Clicktrack General Defaults

export const CLICKTRACK_DEFAULT_NAME = 'Default Clicktrack';
export const CLICKTRACK_DEFAULT_PERMANANT = false;
export const CLICKTRACK_DEFAULT_MASTER_VOLUME = 100; // Default master volume percentage
export const CLICKTRACK_DEFAULT_NOTE: TNote = ['C', 5];
export const CLICKTRACK_DEFAULT_MUTED = false;
export const CLICKTRACK_DEFAULT_NOTE_DURATION = 1;
export const CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT = true;
export const CLICKTRACK_DEFAULT_FADE_OUT = true;
export const CLICKTRACK_DEFAULT_SECTION_TYPE = 'metronome';

// Metronome Defaults

export const METRONOME_DEFAULT_BPM = 120;
export const METRONOME_DEFAULT_TIME_SIGNATURE: TTimeSignature = [4, 4];
export const METRONOME_DEFAULT_LENGTH = 2;
export const METRONOME_DEFAULT_VOLUME = 100;
export const METRONOME_DEFAULT_MUTED = false;
export const METRONOME_TIME_SIGNATURES: TTimeSignature[] = [
  [4, 4],
  [3, 4],
  [12, 8],
  [3, 8],
  [6, 8],
  [9, 8],
  [2, 2],
  [5, 4],
  [6, 4],
];

// Repeat Defaults

export const REPEAT_DEFAULT_TIMES = 1;
export const REPEAT_DEFAULT_INFINITE = true;

// Transition Defaults

export const TRANSITION_DEFAULT_FROMBPM = METRONOME_DEFAULT_BPM;
export const TRANSITION_DEFAULT_TOBPM = METRONOME_DEFAULT_BPM;
export const TRANSITION_DEFAULT_LENGTH = 1;
export const TRANSITION_DEFAULT_CURVE = 'linear';

export const TEMPO_TAPPER_MAX_SAMPLE_SIZE = 2;
export const TEMPO_TAPPER_COOLDOWN_TIME = 2; // seconds
