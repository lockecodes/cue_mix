import ITrackFlags from './TrackFlags'

export default interface ITrack {
  trackNumber: number
  trackName: string
  trackFlags: ITrackFlags
  volume: number
  pan: number
  lastMeterPeak: number
  lastMeterPos: number
  widthPan2: number
  panMode: number
  sendCount: number
  receiveCount: number
  hardwareOutCount: number
  color: number
}
