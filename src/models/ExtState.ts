import Preset from './Preset'

export default class ExtState {
  public section: string
  public key: string
  public value: string
  public presets: { [trackName: string]: Preset } = {}

  constructor(args: Array<string>) {
    [this.section, this.key, this.value] = args
    if(this.isCommandMap()){
      const jsonValue = JSON.parse(this.value)
      Object.keys(jsonValue).forEach((key) => {
        const command = new Preset(key, jsonValue[key].back,jsonValue[key].current,jsonValue[key].forward)
        this.presets[command.monitorName] = command
      })
    }
  }

  isPresetBankValueForTrack(trackName: string) {
    return this.isPresetBankValue() && this.key === trackName
  }

  isCommandMap() {
    return this.section === 'REA_REMOTE_PRESET_COMMANDS' && this.key === 'command_map'
  }

  isPresetBankValue() {
    return this.section === 'REA_REMOTE_PRESET_BANK'
  }
}
