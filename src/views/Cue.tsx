import React, { ReactElement, useEffect, useState } from 'react'
import Track from '../models/Track'
import { useParams } from 'react-router-dom'
import ReaperApiService from '../services/ReaperApi'
import ReaperResponse from '../models/ReaperResponse'
import Presets from '../models/Presets'
import Preset from '../models/Preset'
import axios from 'axios'
import TrackElement from '../components/TrackElement'
import ReceiveElement from '../components/ReceiveElement'

export default function Cue() {
  let params = useParams()
  let trackNumber = parseInt(params.trackNumber || '-1', 10)
  const [presets, setPresets] = useState<Presets>(new Presets())
  const [reaperResponse, setReaperResponse] = useState<ReaperResponse>()
  const [preset, setPreset] = useState<Preset>()

  const getPresets = () => {
    axios.get('/data/presets.json').then((res) => {
      const thisPresets = new Presets(res.data)
      setPresets(thisPresets)
    })
  }

  const getAllTracks = () => {
    return ReaperApiService.get(`/_/TRACK;NTRACK;`).then((response: ReaperResponse) => {
      return response
    })
  }

  const getCueContent = (theTrack: Track) => {
    let url = `/_/TRACK;NTRACK;GET/TRACK/${theTrack.trackNumber}/SEND/0`
    for (let i = 1; i <= theTrack.receiveCount; i++) {
      url += `;GET/TRACK/${params.trackNumber}/SEND/-${i}`
    }
    return ReaperApiService.get(url).then((response: ReaperResponse) => {
      setReaperResponse(response)
      return response
    })
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getPresets()
    getAllTracks().then((response: ReaperResponse) => {
      let thisTrack = response.getTrackByNumber(trackNumber)
      setReaperResponse(response)
      thisTrack = response.getTrackByNumber(trackNumber)
      setPreset(presets.getPreset(thisTrack.trackName))
      getCueContent(thisTrack).then((response: ReaperResponse) => {
        setReaperResponse(response)
      })
    })
  }, [])

  let receiveElems: ReactElement[] = []
  reaperResponse?.receives.map((receive) => {
    receiveElems.push(<ReceiveElement key={receive.receiveNumber} receive={receive} />)
  })

  console.log(reaperResponse)
  return (
    <>
      <TrackElement volume={reaperResponse?.hardwareSend?.volume} trackNumber={trackNumber} />
      {receiveElems}
    </>
  )
}
