import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReaperApiService from '../services/ReaperApi'
import Presets from '../models/Presets'
import axios from 'axios'
import TrackFader from '../components/TrackFader'
import ReceiveFader from '../components/ReceiveFader'
import useInterval from 'services/UseInterval'

export default function Cue() {
  const location = useLocation()
  const track = location.state
  const [hardwareSendVolume, setHardwareSendVolume] = useState()
  const [receiveElems, setReceiveElems] = useState()
  const [, setPreset] = useState()

  useInterval(() => {
    getCueContent().then()
  }, 400)

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
          return <ReceiveFader key={receive.receiveNumber} track={track} receive={receive}/>
        })
      )
    })
  }

  useEffect(() => {
    axios.get('/data/presets.json').then((res) => {
      setPreset(new Presets(res.data).getPreset(track.trackName))
    })
  }, [track.trackName])

  return (
    <>
      <TrackFader volume={hardwareSendVolume} trackNumber={track.trackNumber}/>
      {receiveElems}
    </>
  )
}
