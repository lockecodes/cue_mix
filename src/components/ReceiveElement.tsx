import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEventListener from './UseEventListener'
import ReaperApiService from '../services/ReaperApi'

export default function ReceiveElement(props: {
  volume: number | undefined
  trackName: string | undefined
  trackNumber: number | undefined
  receiveNumber: number | undefined | null
  receiveMuted: boolean
}) {
  const [volume, setVolume] = useState<any>()
  const [trackName, setTrackName] = useState<any>()
  const [volStr, setVolStr] = useState<any>()
  const [muted, setMuted] = useState<boolean>(props.receiveMuted)
  const [muteOffVisible, setMuteOffVisible] = useState<string>()
  const [muteOnVisible, setMuteOnVisible] = useState<string>()
  const sendRef = useRef<any>(null)
  const sendLineRef = useRef<any>(null)
  const sendThumbRef = useRef<any>(null)
  const sendBgRef = useRef<any>(null)
  const sendMuteBtnRef = useRef<any>(null)
  const sendMuteOnRef = useRef<any>(null)
  const sendMuteOffRef = useRef<any>(null)
  let thumbOffset: number
  let mouseDown: boolean = false

  const mouseDownHandler = useCallback(() => {
    mouseDown = true
  }, [])

  const mouseUpHandler = useCallback(() => {
    mouseDown = false
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    mouseDown = false
  }, [])

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    // Update coordinates
    if (mouseDown) {
      let [offset, vol] = calculateOffsets(event.pageX)
      setThumbOffset(offset)
      setVolStr(makeVolumeString(vol))
      sendVolumeChange(vol)
    }
  }, [])

  const touchMoveHandler = useCallback((event: TouchEvent) => {
    // Update coordinates
    if (mouseDown) {
      let [offset, vol] = calculateOffsets(event.changedTouches[0].pageX)
      setThumbOffset(offset)
      setVolStr(makeVolumeString(vol))
      sendVolumeChange(vol)
    }
  }, [])


  const muteMouseDownHandler = useCallback(() => {
    setMuted(!muted)
    let url = `/_/SET/TRACK/${props.trackNumber}/SEND/-${props.receiveNumber}/MUTE/-1`
    ReaperApiService.get(url)
  }, [])

  useEventListener('mousemove', mouseMoveHandler, sendRef.current)
  useEventListener('touchmove', touchMoveHandler, sendRef.current)
  useEventListener('mouseleave', mouseLeaveHandler, sendRef.current)
  useEventListener('mouseup', mouseUpHandler, sendRef.current)
  useEventListener('touchend', mouseUpHandler, sendRef.current)
  useEventListener('mousedown', mouseDownHandler, sendThumbRef.current)
  useEventListener('touchstart', mouseDownHandler, sendThumbRef.current)
  useEventListener('mousedown', muteMouseDownHandler, sendMuteBtnRef.current)

  const calculateOffsets = (pageX: number) => {
    let sendTrackWidth = sendBgRef?.current.getBoundingClientRect()['width']
    let sendThumbWidth = sendBgRef?.current.getBoundingClientRect()['height']
    let sendThumbTrackLEdge = sendBgRef?.current.getBoundingClientRect()['left']

    let sendThumbTrackWidth = (sendTrackWidth - sendThumbWidth)
    let offsetX = pageX - sendThumbTrackLEdge - (sendThumbWidth / 2)
    if (offsetX < 0) {
      offsetX = 0
    }
    if (offsetX > sendThumbTrackWidth) {
      offsetX = sendThumbTrackWidth
    }
    let offsetX262 = offsetX * (262 / sendTrackWidth) + 26
    let sendOutput = (offsetX  / sendThumbTrackWidth)
    let volsendOutput = Math.pow(sendOutput, 4) * 4
    return [offsetX262, volsendOutput]
  }

  const makeVolumeString = (v: number) => {
    if (v < 0.00000002980232) return '-inf dB'
    v = Math.log(v) * 8.68588963806
    return v.toFixed(2) + ' dB'
  }

  const setThumbOffset = (offset: number) => {
    thumbOffset = offset
    sendLineRef?.current.setAttributeNS(null, 'x2', offset.toString())
    sendThumbRef?.current.setAttributeNS(null, 'cx', offset.toString())
  }

  const sendVolumeChange = (vol: number) => {
    let url = `/_/SET/TRACK/${props.trackNumber}/SEND/-${props.receiveNumber}/VOL/${vol.toString()}`
    ReaperApiService.get(url)
  }

  useEffect(() => {
    if(volume !== props.volume) {
      setVolume(props.volume || 0)
      setThumbOffset((Math.pow(props.volume || 0, 1/4) * 154) + 27)
      setVolStr(makeVolumeString(props.volume || 0))
    }
    if(trackName !== props.trackName) {
      setTrackName(props.trackName || 'Track Name')
    }
    if(muted !== props.receiveMuted) {
      setMuted(props.receiveMuted)
    }
    setMuteOnVisible(muted ? 'visible' : 'hidden')
    setMuteOffVisible(muted ? 'hidden' : 'visible')
  })
  return (
    <div ref={sendRef}>
      <svg
        version="1.1"
        display="block"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 320 48"
        xmlSpace="preserve"
      >
        <rect className="sendPanelBg" fill="#333333" width="320" height="49" />
        <path ref={sendBgRef}
          className="sendBg"
          fill="#262626"
          d="M244,0c-0.3,0-0.7,0-1,0v0H142h-17H27v0c-0.3,0-0.7,0-1,0C13.8,0,4,9.8,4,22s9.8,22,22,22
            c0.3,0,0.7,0,1,0v0h98h17h101v0c0.3,0,0.7,0,1,0c12.2,0,22-9.8,22-22S256.2,0,244,0z"
        />
        <line ref={sendLineRef}
          className="sendLine"
          pointerEvents="none"
          fill="none"
          opacity="0.5"
          stroke="#404040"
          strokeWidth="38"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="27"
          y1="22"
          x2="130"
          y2="22"
        />
        <text
          className="sendTitleText"
          pointerEvents="none"
          transform="matrix(1 0 0 1 25 29)"
          fill="#A3A3A3"
          fontFamily="'Open Sans'"
          fontSize="19px"
        >
          {trackName}
        </text>
        <text
          className="sDbText"
          pointerEvents="none"
          textAnchor="end"
          transform="matrix(1 0 0 1 250 27)"
          fill="#A3A3A3"
          fontFamily="'Open Sans'"
          fontSize="12px"
        >
          {volStr}
        </text>
        <circle ref={sendThumbRef}
          className="sendThumb"
          opacity="0.5"
          fill="#808080"
          stroke="#262626"
          strokeWidth="2"
          strokeMiterlimit="10"
          cx="26"
          cy="22"
          r="19"
        />

        <g className="send_mute button" ref={sendMuteBtnRef}>
          <g className="send_mute_off" visibility={muteOffVisible} ref={sendMuteOffRef}>
            <path
              className="shadow"
              opacity="0.15"
              d="M314.4,45.2c0,1-0.8,1.8-1.8,1.8h-39c-1,0-1.8-0.8-1.8-1.8
                        v-4.6h42.7v4.6H314.4z"
            />
            <linearGradient
              id="smoGrad"
              gradientUnits="userSpaceOnUse"
              x1="1720.0585"
              y1="-785.3847"
              x2="1720.0585"
              y2="-828.6583"
              gradientTransform="matrix(1 0 0 -1 -1427 -785)"
            >
              <stop offset="0" stopColor="#404040" />
              <stop offset="1" stopColor="#333333" />
            </linearGradient>
            <path
              fill="url(#smoGrad)"
              d="M273.6,43.6c-1.2,0-2.1-1-2.1-2.1v-39c0-1.2,1-2.1,2.1-2.1h39c1.2,0,2.1,1,2.1,2.1v39
                        c0,1.2-1,2.1-2.1,2.1H273.6z"
            />
            <g>
              <path
                fill="#805240"
                d="M293.1,25.9L293.1,25.9l4.2-10h2.2v12.3h-1.8V19h-0.1l-3.9,9.1h-1.2l-4-9.5h-0.1v9.5h-1.8V15.9h2.3
                            L293.1,25.9z"
              />
            </g>
            <path
              className="mouseover"
              visibility="hidden"
              opacity="0.05"
              fill="#FFFFFF"
              d="M273.6,43.6c-1.2,0-2.1-1-2.1-2.1v-39 c0-1.2,1-2.1,2.1-2.1h39c1.2,0,2.1,1,2.1,2.1v39c0,1.2-1,2.1-2.1,2.1H273.6z"
            />
          </g>
          <g className="send_mute_on" visibility={muteOnVisible} ref={sendMuteOnRef}>
            <path
              display="inline"
              fill="#F13F24"
              d="M273.6,43.6c-1.2,0-2.1-1-2.1-2.1v-39c0-1.2,1-2.1,2.1-2.1h39c1.2,0,2.1,1,2.1,2.1v39
                        c0,1.2-1,2.1-2.1,2.1H273.6z"
            />
            <g display="inline">
              <path
                fill="#FFFFFF"
                d="M293.1,25.9L293.1,25.9l4.2-10h2.2v12.3h-1.8V19h-0.1l-3.9,9.1h-1.2l-4-9.5h-0.1v9.5h-1.8V15.9h2.3
                            L293.1,25.9z"
              />
            </g>
            <path
              className="mouseover"
              visibility="hidden"
              opacity="0"
              fill="#FFFFFF"
              d="M273.6,43.6 c-1.2,0-2.1-1-2.1-2.1v-39c0-1.2,1-2.1,2.1-2.1h39c1.2,0,2.1,1,2.1,2.1v39c0,1.2-1,2.1-2.1,2.1H273.6z"
            />
          </g>
          <path
            fill="#1A1A1A"
            d="M312.6,0.7c1,0,1.8,0.8,1.8,1.8v39c0,1-0.8,1.8-1.8,1.8h-39c-1,0-1.8-0.8-1.8-1.8v-39
                    c0-1,0.8-1.8,1.8-1.8H312.6 M312.6,0.1h-39c-1.3,0-2.4,1.1-2.4,2.4v39c0,1.3,1.1,2.4,2.4,2.4h39c1.3,0,2.4-1.1,2.4-2.4v-39
                    C315,1.2,313.9,0.1,312.6,0.1L312.6,0.1z"
          />
        </g>
      </svg>
    </div>
  )
}
