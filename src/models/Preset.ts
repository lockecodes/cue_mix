export default class Preset {
  public readonly monitorName: string
  public readonly backCommand: string
  public readonly currentCommand: string
  public readonly forwardCommand: string

  constructor(
    monitorName: string,
    backCommand: string,
    currentCommand: string,
    forwardCommand: string
  ) {
    this.monitorName = monitorName
    this.backCommand = backCommand
    this.currentCommand = currentCommand
    this.forwardCommand = forwardCommand
  }
}
