import Preset from './Preset'
import PresetJson from '../data/presets.json'

export default class Presets {
  public readonly presets: Preset[]

  constructor() {
    let dataJson = PresetJson
    this.presets = []
    for (let [key, value] of Object.entries(dataJson)) {
      let monitorName: string = key
      let back: string = ''
      let current: string = ''
      let forward: string = ''
      for (let [presetDirection, commandString] of Object.entries<string>(value)) {
        switch (presetDirection) {
          case 'back':
            back = commandString
            break
          case 'current':
            current = commandString
            break
          case 'forward':
            forward = commandString
        }
      }
      this.presets.push(new Preset(monitorName, back, current, forward))
    }
  }

  getPreset(monitorName: string) {
    // TODO: handle empty sometime
    return this.presets.filter((value) => {
      return value.monitorName === monitorName
    })[0]
  }
}
