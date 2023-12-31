export type TNotification =
  | {
      content: string;
      type: TNotificationTypes;
    }
  | undefined;
export type TNotificationTypes = 'warning' | 'error' | 'info' | undefined;
export type TNotify = (content: string, type: TNotificationTypes) => void;
export type TNotificationContext = {
  notif: TNotification;
  notify: TNotify;
  clearNotif: () => void;
};

export type TDarkModeContext = {
  dark: boolean;
  toggleDark: () => void;
};

export type ClicktrackRouteParams = {
  id: string;
};

export type TTimeSignature = [beats: number, value: number];
export type TNote = [note: string, octave: number];
export type TSaveableData =
  | string
  | number
  | object
  | boolean
  | undefined
  | null;
