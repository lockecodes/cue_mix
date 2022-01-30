export default class NTrack {
  public _className: string = 'NTrack'
  public trackCount: number

  constructor(trackCount: string) {
    this.trackCount = parseInt(trackCount, 10)
  }
}
