import React, { useEffect, useState } from 'react'
import ReaperApiService from '../services/ReaperApi'

export default function TrackFader(props: { volume: number; trackNumber: number }) {
  const decimalMax = 3.981072
  const [volume, setVolume] = useState<number>(transformVolume(props.volume))

  function transformVolume(value: number) {
    return Math.min(value, decimalMax)
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = Math.min(parseFloat(e.currentTarget?.value), decimalMax)
    setVolume(value)
    ReaperApiService.get(
      `/_/SET/TRACK/${props.trackNumber}/SEND/0/VOL/${transformVolume(value).toString()}`
    )
  }

  useEffect(() => {
    if (volume !== transformVolume(props.volume)) {
      setVolume(transformVolume(props.volume))
    }
  }, [volume, props.volume])
  return (
    <div className="trackSlideContainer">
      <datalist id="tickmarks">
        <option value="0" label="-inf"></option>
        <option value="0.5"></option>
        <option value="1" label="0db"></option>
        <option value="3.99" label="+12db"></option>
      </datalist>
      <input
        className="trackSlider"
        type="range"
        name="volume"
        min="0"
        max="3.99"
        step="0.01"
        value={volume}
        onChange={onChange}
        list="tickmarks"
      />
    </div>
  )
}
