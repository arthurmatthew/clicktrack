export const hwPreferredSampleRate = new AudioContext().sampleRate // get Default Output preferred SampleRate
export const globalAudioContext = new OfflineAudioContext({
  numberOfChannels: 1,
  sampleRate: hwPreferredSampleRate,
  length: hwPreferredSampleRate, // 1 Second
})