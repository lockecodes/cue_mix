export default class Preset {
  public readonly trackName: string
  public readonly monitorName: string
  public readonly backCommand: string
  public readonly currentCommand: string
  public readonly forwardCommand: string
  public currentPresetName: string

  constructor(
    trackName: string,
    backCommand: string,
    currentCommand: string,
    forwardCommand: string
  ) {
    this.currentPresetName = ''
    this.trackName = trackName
    this.monitorName = `${this.trackName} Monitor`
    this.backCommand = backCommand
    this.currentCommand = currentCommand
    this.forwardCommand = forwardCommand
  }
}
