import Track from './Track'
import NTrack from './NTrack'
import IReaperResponse from '../types/ReaperResponse'
import Send from './Send'

export default class ReaperResponse implements IReaperResponse {
  public trackCount: number
  public rows: (Track | NTrack | Send)[]
  public tracks: Track[]
  public armedTracks: Track[]
  public monitorTracks: Track[]
  public hardwareSend: Send | undefined
  public receives: Send[]

  constructor(response: { data: string }) {
    const rows = response.data.trim().split('\n')
    this.rows = []
    this.tracks = []
    this.receives = []
    this.trackCount = 0

    rows.forEach((rowText: string) => {
      const columnsArray = rowText.trim().split('\t')
      switch (columnsArray[0].trim()) {
        case 'TRACK':
          const track = new Track(columnsArray.slice(1))
          this.rows.push(track)
          this.tracks.push(track)
          break
        case 'SEND':
          const send = new Send(columnsArray.slice(1))
          this.rows.push(send)
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
          this.rows.push(ntrack)
          break
        case '':
          break
        default:
          console.log('need to add other row types')
      }
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
