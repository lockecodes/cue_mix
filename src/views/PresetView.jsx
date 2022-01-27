import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Presets from '../models/Presets'

export default function PresetView() {
  const navigate = useNavigate()
  const location = useLocation()
  const track = location.state || { trackNumber: null, trackName: null }
  const [preset, setPreset] = useState(new Presets().getPreset(track.trackName))

  useEffect(() => {
    if (track.trackNumber === null) {
      navigate('/')
    }
  }, [navigate, track.trackName])

  return (
    <div>
      <p>Previous</p>
      <p>Current</p>
      <p>Next</p>
    </div>
  )
}
