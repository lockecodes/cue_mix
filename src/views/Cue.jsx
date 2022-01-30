import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReaperApiService from '../services/ReaperApi'
import TrackFader from '../components/TrackFader/TrackFader'
import ReceiveFader from '../components/ReceiveFader/ReceiveFader'
import useInterval from '../services/UseInterval'
import './Cue.css'

export default function Cue() {
  const navigate = useNavigate()
  const location = useLocation()
  const track = location.state || { trackNumber: null, trackName: null, receiveCount: 0 }
  const [hardwareSendVolume, setHardwareSendVolume] = useState()
  const [receiveElems, setReceiveElems] = useState()
  const [hidePresetLink, setHidePresetLink] = useState(true)
  const [preset, setPreset] = useState()

  useInterval(() => {
    getCueContent().then()
  }, 1000)

  const getCueContent = () => {
    let url = `/_/TRACK;NTRACK;GET/TRACK/${
      track.trackNumber
    }/SEND/0;GET/EXTSTATE/REA_REMOTE_PRESET_COMMANDS/command_map;GET/EXTSTATE/REA_REMOTE_PRESET_BANK/${track.trackName.replace(
      ' Monitor',
      ''
    )}`
    for (let i = 1; i <= track.receiveCount; i++) {
      url += `;GET/TRACK/${track.trackNumber}/SEND/-${i}`
    }
    return ReaperApiService.get(url).then((response) => {
      if (hardwareSendVolume !== response.hardwareSend.volume) {
        setHardwareSendVolume(response.hardwareSend.volume)
      }
      setReceiveElems(
        response.receives.map((receive) => {
          return <ReceiveFader key={receive.receiveNumber} track={track} receive={receive} />
        })
      )
      const thisTrack = response.getTrackByNumber(track.trackNumber)
      if (thisTrack.isMonitor && response.presets.hasOwnProperty(thisTrack.trackName)) {
        setHidePresetLink(false)
        setPreset(response.presets[thisTrack.trackName])
      }
    })
  }

  useEffect(() => {
    if (track.trackNumber === null) {
      navigate('/')
    }
  }, [navigate, track.trackName])

  return (
    <>
      <TrackFader volume={hardwareSendVolume} trackNumber={track.trackNumber} />
      {receiveElems}
      <p
        className="presetLink"
        style={{ visibility: hidePresetLink ? 'hidden' : 'visible' }}
        onClick={() => {
          navigate('/presets',  { state: preset })
        }}
      >
        Presets
      </p>
    </>
  )
}
