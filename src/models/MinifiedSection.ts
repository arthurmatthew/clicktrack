export class MinifiedSection {
  public readonly t: 'm' | 'r';
  constructor(options?: Partial<MinifiedSection>) {
    this.t = options?.t ?? 'm';
  }
}
