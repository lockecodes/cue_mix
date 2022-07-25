import React, { useCallback, useEffect, useState } from 'react'
import ReaperApiService from '../../services/ReaperApi'
import './ReceiveFader.css'
import Track from '../../models/Track'
import Send from '../../models/Send'
import MuteButton from "../MuteButton/MuteButton";

export default function ReceiveFader(props: { track: Track; receive: Send }) {
  const decimalMax = 3.981072
  const inputMin = 0
  const inputMax = 3.981072
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let target = e.currentTarget
    let valFloat = parseFloat(target.value)
    const transVol = transformVolume(valFloat)
    setVolume(transVol || 0)
    setVolStr(makeVolumeString(transVol || 0))
    setBackgroundSize(calculateBackground(transVol))
  }

  const handleMouseUp = (e: React.FormEvent<HTMLInputElement>) => {
    let target = e.currentTarget
    let valFloat = parseFloat(target.value)
    const transVol = transformVolume(valFloat)
    ReaperApiService.get(
      `/_/SET/TRACK/${props.track.trackNumber}/SEND/-${
        props.receive.receiveNumber
      }/VOL/${transVol.toString()}`
    )
  }

  function calculateBackground(value: number) {
    return ((value - inputMin) * 100) / (inputMax - inputMin) + '% 100%'
  }

  const makeVolumeString = useCallback((v: number) => {
    if (v < 0.00000002980232) return '-inf dB'
    v = Math.log(v) * 8.68588963806
    return v.toFixed(2) + ' dB'
  }, [])

  useEffect(() => {
    let transVol = transformVolume(props.receive.volume)
    setVolume(transVol || 0)
    setVolStr(makeVolumeString(transVol || 0))
    setBackgroundSize(calculateBackground(transVol))
    setTrackName(props.receive.otherTrack?.trackName)
  }, [])

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
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          data-trackname={trackName}
          data-volume={volStr}
          style={cssProperties}
        />
      </div>
      <MuteButton track={props.track} receive={props.receive} />
    </div>
  )
}
