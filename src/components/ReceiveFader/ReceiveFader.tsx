import React, { useCallback, useEffect, useState } from 'react'
import ReaperApiService from '../../services/ReaperApi'
import ITrack from 'types/Track'
import ISend from 'types/Send'
import muteOn from 'images/muteOn.png'
import muteOff from 'images/muteOff.png'
import './ReceiveFader.css'

export default function ReceiveFader(props: { track: ITrack; receive: ISend }) {
  const decimalMax = 3.981072
  const inputMin = 0
  const inputMax = 3.981072
  const [muted, setMuted] = useState<boolean>()
  const [volume, setVolume] = useState<number>()
  const [volStr, setVolStr] = useState<any>()
  const [trackName, setTrackName] = useState<string>()
  const [backgroundSize, setBackgroundSize] = useState<string>('70% 100%')
  const cssProperties: React.CSSProperties = {
    backgroundSize: backgroundSize,
  }

  const transformVolume = useCallback(
    (value: number) => {
      return Math.min(value, decimalMax)
    },
    [decimalMax]
  )

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    let target = e.currentTarget
    let valFloat = parseFloat(target.value)
    const value = Math.min(valFloat, decimalMax)
    setBackgroundSize(calculateBackground(valFloat))
    ReaperApiService.get(
      `/_/SET/TRACK/${props.track.trackNumber}/SEND/-${
        props.receive.receiveNumber
      }/VOL/${value.toString()}`
    )
  }

  function calculateBackground(value: number) {
    return ((value - inputMin) * 100) / (inputMax - inputMin) + '% 100%'
  }

  const muteMouseDownHandler = useCallback(() => {
    ReaperApiService.get(
      `/_/SET/TRACK/${props.track.trackNumber}/SEND/-${props.receive.receiveNumber}/MUTE/-1`
    )
  }, [props.receive.receiveNumber, props.track.trackNumber])

  const makeVolumeString = useCallback((v: number) => {
    if (v < 0.00000002980232) return '-inf dB'
    v = Math.log(v) * 8.68588963806
    return v.toFixed(2) + ' dB'
  }, [])

  useEffect(() => {
    let transVol = transformVolume(props.receive.volume)
    if (volume !== transVol) {
      setVolume(transVol || 0)
      setVolStr(makeVolumeString(transVol || 0))
      setBackgroundSize(calculateBackground(transVol))
    }
    if (trackName !== props.receive.otherTrack?.trackName) {
      setTrackName(props.receive.otherTrack?.trackName)
    }
    if (muted != props.receive.flags.muted) {
      setMuted(props.receive.flags.muted)
    }
  }, [
    makeVolumeString,
    props.receive.flags.muted,
    props.receive.volume,
    props,
    trackName,
    transformVolume,
    volume,
  ])

  return (
    <div className="receiveContainer">
      <div className="receiveSliderContainer">
        <input
          className="receiveSlider"
          type="range"
          name="volume"
          min={inputMin}
          max={inputMax}
          step="0.01"
          value={volume}
          onChange={onChange}
          data-trackname={trackName}
          data-volume={volStr}
          style={cssProperties}
        />
      </div>
      <div className="muteContainer">
        <img
          src={muted ? muteOn : muteOff}
          alt="Mute Button"
          onClick={() => muteMouseDownHandler()}
        />
      </div>
    </div>
  )
}
