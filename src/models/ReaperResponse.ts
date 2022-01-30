import Track from './Track'
import NTrack from './NTrack'
import Send from './Send'
import ExtState from './ExtState'
import Preset from './Preset'

export default class ReaperResponse {
  public trackCount: number
  public tracks: Track[]
  public armedTracks: Track[]
  public monitorTracks: Track[]
  public hardwareSend: Send | undefined
  public receives: Send[]
  public externalStates: ExtState[]
  public presets: { [trackName: string]: Preset } = {}

  constructor(response: { data: string }) {
    const rows = response.data.trim().split('\n')
    this.tracks = []
    this.receives = []
    this.externalStates = []
    this.trackCount = 0

    rows.forEach((rowText: string) => {
      const columnsArray = rowText.trim().split('\t')
      switch (columnsArray[0].trim()) {
        case 'TRACK':
          const track = new Track(columnsArray.slice(1))
          this.tracks.push(track)
          break
        case 'SEND':
          const send = new Send(columnsArray.slice(1))
          if (send.isHardwareOutput) {
            this.hardwareSend = send
            break
          }
          if (send.isReceive) {
            this.receives.push(send)
            break
          }
          break
        case 'NTRACK':
          const ntrack = new NTrack(columnsArray[1])
          this.trackCount = ntrack.trackCount
          break
        case 'EXTSTATE':
          const externalState = new ExtState(columnsArray.slice(1))
          this.externalStates.push(externalState)
          if (Object.keys(externalState.presets).length > 0) {
            this.presets = externalState.presets
          }
          break
        case '':
          break
        default:
          console.log('need to add other row types')
      }
    })

    this.tracks.forEach((track: Track) => {
      this.externalStates.forEach((externalState: ExtState) => {
        if(externalState.isCommandMap()) {
          track.preset = externalState.presets[track.trackName]
        }
      })
      this.externalStates.forEach((externalState: ExtState) => {
        if(externalState.isPresetBankValueForTrack(track.monitoredTrackName) && track.preset) {
          track.preset.currentPresetName = externalState.value
        }
      })
    })

    this.armedTracks = this.tracks.filter((armedTrack: Track) => {
      return armedTrack.isArmed
    })
    this.monitorTracks = this.tracks.filter((monitorTrack: Track) => {
      return monitorTrack.isMonitor
    })

    this.receives.forEach((receive: Send) => {
      let receiveTrack: Track = this.getTrackByNumber(receive.trackNumber)
      let otherTrack: Track = this.getTrackByNumber(receive.otherTrackIndex)
      receive.track = receiveTrack
      receive.otherTrack = otherTrack
    })
  }

  getTrackByNumber(trackNumber: number) {
    let foundTracks = this.tracks.filter((track) => {
      return track.trackNumber === trackNumber
    })
    return foundTracks[0]
  }
}
