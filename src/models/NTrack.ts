import INTrack from '../types/NTrack'

export default class NTrack implements INTrack {
  public _className: string = 'NTrack'
  public trackCount: number
  constructor(trackCount: string) {
    this.trackCount = parseInt(trackCount, 10)
  }
}
