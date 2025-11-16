export class AudioBufferCache {
  private cache: Map<string, AudioBuffer> = new Map();
  private loading: Map<string, Promise<AudioBuffer>> = new Map();

  async getBuffer(
    audioContext: AudioContext,
    url: string,
  ): Promise<AudioBuffer | null> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    if (this.loading.has(url)) {
      return this.loading.get(url)!;
    }

    const loadingPromise = this.loadBuffer(audioContext, url);
    this.loading.set(url, loadingPromise);

    try {
      const buffer = await loadingPromise;
      this.cache.set(url, buffer);
      this.loading.delete(url);
      return buffer;
    } catch (error) {
      this.loading.delete(url);
      console.error('Failed to load audio buffer:', error);
      return null;
    }
  }

  getCachedBuffer(url: string): AudioBuffer | null {
    return this.cache.get(url) ?? null;
  }

  private async loadBuffer(
    audioContext: AudioContext,
    url: string,
  ): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  }

  preload(audioContext: AudioContext, urls: string[]): Promise<void[]> {
    return Promise.all(
      urls.map((url) => this.getBuffer(audioContext, url).then(() => {})),
    );
  }

  clear() {
    this.cache.clear();
    this.loading.clear();
  }

  clearUrl(url: string) {
    this.cache.delete(url);
    this.loading.delete(url);
  }
}

export const audioBufferCache = new AudioBufferCache();
