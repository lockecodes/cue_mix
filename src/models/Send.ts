import SendFlags from './SendFlags'
import Track from './Track'

export default class Send {
  public readonly trackNumber: number
  public readonly sendNumber: number
  public readonly flags: SendFlags
  public readonly volume: number
  public readonly pan: number
  public readonly otherTrackIndex: number
  public readonly isHardwareOutput: boolean
  public readonly isReceive: boolean
  public readonly receiveNumber: number | null
  public track: Track | undefined
  public otherTrack: Track | undefined

  public constructor(args: Array<string>) {
    let [trackNumber, sendNumber, flags, volume, pan, other_track_index] = args
    this.trackNumber = parseInt(trackNumber)
    this.sendNumber = parseInt(sendNumber)
    this.flags = new SendFlags(flags)
    this.volume = parseFloat(volume)
    this.pan = parseFloat(pan)
    this.otherTrackIndex = parseInt(other_track_index)
    this.isHardwareOutput = this.otherTrackIndex === -1
    this.isReceive = this.sendNumber < 0
    this.receiveNumber = this.sendNumber < 0 ? -1 * this.sendNumber : null
  }
}
