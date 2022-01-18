export default class SendFlags {
  public readonly muted: boolean

  public constructor(value: string) {
    this.muted = !!(parseInt(value) & 8)
  }
}
