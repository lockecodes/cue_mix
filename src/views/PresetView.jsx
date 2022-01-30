import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './PresetView.css'
import ReaperApiService from '../services/ReaperApi'
import useInterval from '../services/UseInterval'

export default function PresetView() {
  const navigate = useNavigate()
  const location = useLocation()
  const preset = location.state || {
    backCommand: null,
    currentCommand: null,
    forwardCommand: null,
    currentPresetName: null,
    trackName: null,
  }
  const [currentPreset, setCurrentPreset] = useState(preset.currentPresetName)

  const presetBack = useCallback(() => {
    ReaperApiService.get(`/_/${preset.backCommand}`)
    presetCurrent()
  }, [preset])

  const presetCurrent = useCallback(() => {
    ReaperApiService.get(`/_/${preset.currentCommand}`)
    ReaperApiService.get(`/_/GET/EXTSTATE/REA_REMOTE_PRESET_BANK/${preset.trackName}`).then(
      (response) => {
        setCurrentPreset(response.externalStates[0].value)
      }
    )
  }, [preset])

  const presetForward = useCallback(() => {
    ReaperApiService.get(`/_/${preset.forwardCommand}`)
    presetCurrent()
  }, [preset])

  useInterval(() => {
    presetCurrent()
  }, 1000)


  useEffect(() => {
    if (preset.trackName === null) {
      navigate('/')
    }
  }, [navigate, preset.currentPresetName])

  return (
    <div className="presets">
      <p
        className="button"
        onClick={presetBack}
      >Previous</p>
      <p className="current">{currentPreset}</p>
      <p
        className="button"
        onClick={presetForward}
      >Next</p>
    </div>
  )
}
