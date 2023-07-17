/**
 * Sound library which directly mutates your `OscillatorNode`
 */
export const sounds = [
  /**
   * Sine shape
   */
  (osc: OscillatorNode) => {
    osc.type = 'sine';
  },
  /**
   * Sawtooth shape
   */
  (osc: OscillatorNode) => {
    osc.type = 'sawtooth';
  },
];
