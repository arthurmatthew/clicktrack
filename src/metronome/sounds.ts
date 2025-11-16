import { ICustomSound } from '../types';

export const SOUND_LIBRARY = {
  'wood-block': {
    id: 'wood-block',
    name: 'Wood Block',
    url: '/sounds/wood-block.wav',
  },
} as const satisfies Record<string, ICustomSound>;

export const SOUND_LIST = Object.values(SOUND_LIBRARY);
