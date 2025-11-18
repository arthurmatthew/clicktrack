import { User } from 'firebase/auth';
import { Metronome } from './models/Metronome';
import { Transition } from './models/Transition';
import { Repeat } from './models/Repeat';

// User & Auth Types
export type TUserContext = {
  user: User | null;
  premium: boolean;
  initialized: boolean;
};

export type TUserDocument = {
  clicktracks: string[];
};

export type TCustomerPortalResult = {
  url: string;
};

// Notification Types
export type TNotificationTypes = 'warning' | 'error' | 'info' | undefined;

export type TNotification =
  | {
      content: string;
      type: TNotificationTypes;
    }
  | undefined;

export type TNotify = (content: string, type: TNotificationTypes) => void;

export type TNotificationContext = {
  notif: TNotification;
  notify: TNotify;
  clearNotif: () => void;
};

// UI/Theme Types
export type TDarkModeContext = {
  dark: boolean;
  toggleDark: () => void;
};

// Route Types
export type ClicktrackRouteParams = {
  id: string;
};

// Template Types
export type TTemplate = {
  code: string;
  name: string;
  description: string;
};

// Music/Audio Types
export type TTimeSignature = [beats: number, value: number];

export type TNote = [note: string, octave: number];

export type TAccentLevels = 0 | 1 | 2 | 3;

export type TAccentMap = TAccentLevels[];

export type TCurveTypes = 'linear' | 'ease-in' | 'ease-out' | 'custom';

export type TWaves = Exclude<OscillatorType, 'custom'>;

// Sound Types
export type TSoundType = 'oscillator' | 'sample';

export interface ICustomSound {
  id: string;
  name: string;
  url: string;
  buffer?: AudioBuffer;
}

// Section Types
export const SectionTypeMap = {
  metronome: Metronome,
  repeat: Repeat,
  transition: Transition,
};

export type TSection = Metronome | Repeat | Transition;

export type TSectionTypes = 'metronome' | 'repeat' | 'transition';

// Playback Types
export type TPlaybackState = {
  current16thBeat: number;
  totalSectionsPlayed: number;
  totalBarsPlayed: number;
  repeatsTaken: Map<string, number>;
  selectedId: string;
};

// Utility Types
export type TSaveableData =
  | string
  | number
  | object
  | boolean
  | undefined
  | null;

export type TSharedClicktrackDocument = {
  data: string;
  name: string;
  createdAt: string;
  isPublic: boolean; // false = shared link, true = public library
  description: string; // for lib
  createdBy: string; // for lib
};

export type TSharedClicktrackDictionaryDocument = {
  shareId: string;
  createdBy: string;
};
