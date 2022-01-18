/* eslint-disable */
import ITrackFlags from '../types/TrackFlags'
const FLAG_FOLDER = 'folder'
const FLAG_SELECTED = 'selected'
const FLAG_HAS_FX = 'has-fx'
const FLAG_MUTED = 'muted'
const FLAG_SOLOED = 'soloed'
const FLAG_SOLO_IN_PLACE = 'solo-in-place'
const FLAG_RECORD_ARMED = 'record-armed'
const FLAG_RECORD_MONITORING_ON = 'record-monitoring-on'
const FLAG_RECORD_MONITORING_AUTO = 'record-monitoring-auto'

export default class TrackFlags implements ITrackFlags {
  public readonly recordArmed: boolean
  public readonly flags: string[]
  public readonly folder: boolean
  public readonly selected: boolean
  public readonly hasFx: boolean
  public readonly muted: boolean
  public readonly soloed: boolean
  public readonly soloInPlace: boolean
  public readonly recordMonitoringOn: boolean
  public readonly recordMonitoringAuto: boolean

  constructor(value: string) {
    this.flags = []
    this.folder = false
    this.selected = false
    this.hasFx = false
    this.muted = false
    this.soloed = false
    this.soloInPlace = false
    this.recordArmed = false
    this.recordMonitoringOn = false
    this.recordMonitoringAuto = false
    if (parseInt(value, 10) & 1) {
      this.flags.push(FLAG_FOLDER)
      this.folder = true
    }
    if (parseInt(value, 10) & 2) {
      this.flags.push(FLAG_SELECTED)
      this.selected = true
    }
    if (parseInt(value, 10) & 4) {
      this.flags.push(FLAG_HAS_FX)
      this.hasFx = true
    }
    if (parseInt(value, 10) & 8) {
      this.flags.push(FLAG_MUTED)
      this.muted = true
    }
    if (parseInt(value, 10) & 16) {
      this.flags.push(FLAG_SOLOED)
      this.soloed = true
    }
    if (parseInt(value, 10) & 32) {
      this.flags.push(FLAG_SOLO_IN_PLACE)
      this.soloInPlace = true
    }
    if (parseInt(value, 10) & 64) {
      this.flags.push(FLAG_RECORD_ARMED)
      this.recordArmed = true
    }
    if (parseInt(value, 10) & 128) {
      this.flags.push(FLAG_RECORD_MONITORING_ON)
      this.recordMonitoringOn = true
    }
    if (parseInt(value, 10) & 256) {
      this.flags.push(FLAG_RECORD_MONITORING_AUTO)
      this.recordMonitoringAuto = true
    }
  }
}
