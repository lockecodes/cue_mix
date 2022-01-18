import INTrack from './NTrack'
import Track from '../models/Track'
import ISend from './Send'

export default interface IReaperResponse {
  trackCount: number
  rows: (Track | INTrack | ISend)[]
  tracks: Track[]
  armedTracks: Track[]
  monitorTracks: Track[]
}
