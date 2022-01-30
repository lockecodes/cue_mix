import TrackFlags from './TrackFlags'
import Preset from './Preset'

export default class Track {
  public readonly trackNumber: number
  public readonly trackName: string
  public readonly trackFlags: TrackFlags
  public volume: number
  public pan: number
  public lastMeterPeak: number
  public lastMeterPos: number
  public widthPan2: number
  public panMode: number
  public readonly sendCount: number
  public readonly receiveCount: number
  public readonly hardwareOutCount: number
  public readonly color: number
  public preset: Preset = new Preset("", "", "", "")
  public readonly monitoredTrackName: string = ""

  public constructor(args: Array<string>) {
    let [
      trackNumber,
      trackName,
      trackFlags,
      volume,
      pan,
      lastMeterPeak,
      lastMeterPos,
      widthPan2,
      panMode,
      sendCnt,
      recvCnt,
      hwoutCnt,
      color,
    ] = args
    this.trackNumber = parseInt(trackNumber, 10)
    this.trackName = trackName
    this.trackFlags = new TrackFlags(trackFlags)
    this.volume = parseFloat(volume)
    this.pan = parseFloat(pan)
    this.lastMeterPeak = parseFloat(lastMeterPeak)
    this.lastMeterPos = parseFloat(lastMeterPos)
    this.widthPan2 = parseFloat(widthPan2)
    this.panMode = parseInt(panMode, 10)
    this.sendCount = parseInt(sendCnt, 10)
    this.receiveCount = parseInt(recvCnt, 10)
    this.hardwareOutCount = parseInt(hwoutCnt, 10)
    this.color = parseInt(color, 10)
    this.monitoredTrackName = this.isMonitor ? trackName.replace(' Monitor', '') : ''
  }

  get isMaster() {
    return this.trackNumber === 0
  }

  get isArmed() {
    return this.trackFlags.recordArmed
  }

  get isMonitor() {
    return this.hardwareOutCount > 0 && this.receiveCount > 0
  }
}
