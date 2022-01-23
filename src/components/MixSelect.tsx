import React, { useState } from 'react'
import ReaperApiService from '../services/ReaperApi'
import ReaperResponse from '../models/ReaperResponse'
import Track from '../models/Track'
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export default function MixSelect() {
  const navigate = useNavigate()
  const [selectedTrack] = useState<Track | null>(null)

  // handle selection
  const handleChange = (value: React.SetStateAction<Track | null>) => {
    navigate('/cue', { state: value })
  }

  // load options using API call
  const loadOptions = () => {
    return ReaperApiService.get('_/TRACK;NTRACK;').then((response: ReaperResponse) => {
      return response.monitorTracks
    })
  }

  return (
    <div className="App">
      <h3>Select Monitor</h3>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedTrack}
        getOptionLabel={(e) => e.trackName}
        getOptionValue={(e) => e.trackNumber.toString()}
        loadOptions={loadOptions}
        onChange={handleChange}
      />
    </div>
  )
}
