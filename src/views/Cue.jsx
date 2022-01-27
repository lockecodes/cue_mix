import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReaperApiService from '../services/ReaperApi'
import Presets from '../models/Presets'
import TrackFader from '../components/TrackFader/TrackFader'
import ReceiveFader from '../components/ReceiveFader/ReceiveFader'
import useInterval from '../services/UseInterval'

export default function Cue() {
  const navigate = useNavigate()
  const location = useLocation()
  const track = location.state || { trackNumber: null, trackName: null }
  const [hardwareSendVolume, setHardwareSendVolume] = useState()
  const [receiveElems, setReceiveElems] = useState()

  useInterval(() => {
    getCueContent().then()
  }, 1000)

  const getCueContent = () => {
    let url = `/_/TRACK;NTRACK;GET/TRACK/${track.trackNumber}/SEND/0`
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
    </>
  )
}
