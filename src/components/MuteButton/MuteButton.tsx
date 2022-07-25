import React, { useEffect, useState } from 'react'
import ReaperApiService from '../../services/ReaperApi'
import muteOn from 'images/muteOn.png'
import muteOff from 'images/muteOff.png'
import Track from '../../models/Track'
import Send from '../../models/Send'

export default function MuteButton(props: { track: Track; receive: Send }) {
  const [muted, setMuted] = useState<boolean>()

  const muteMouseDownHandler = (e: React.FormEvent<HTMLImageElement>) => {
    ReaperApiService.get(
      `/_/SET/TRACK/${props.track.trackNumber}/SEND/-${props.receive.receiveNumber}/MUTE/-1`
    )
    setMuted(!muted)
    e.currentTarget.src = muted ? muteOn : muteOff
  }

  useEffect(() => {
    setMuted(props.receive.flags.muted)
  }, [])

  return (
    <div className="muteContainer">
      <img
        src={muted ? muteOn : muteOff}
        alt="Mute Button"
        onClick={muteMouseDownHandler}
      />
    </div>
  )
}
