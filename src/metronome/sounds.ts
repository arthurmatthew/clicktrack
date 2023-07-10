/**
 * Sound library which directly mutates your `OscillatorNode`
 */
export const sounds = {
  /**
   * Sine shape
   */
  '1': (osc: OscillatorNode) => {
    osc.type = 'sine';
  },
  /**
   * Sawtooth shape
   */
  '2': (osc: OscillatorNode) => {
    osc.type = 'sawtooth';
  },
};
