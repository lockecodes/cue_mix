import ISendFlags from './SendFlags'
import Track from '../models/Track'

export default interface ISend {
  trackNumber: number
  sendNumber: number
  flags: ISendFlags
  volume: number
  pan: number
  otherTrackIndex: number
  track: Track | undefined
  otherTrack: Track | undefined
}
