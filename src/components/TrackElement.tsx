import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEventListener from './UseEventListener'
import ReaperApiService from '../services/ReaperApi'
import styled from 'styled-components'

export default function TrackElement(props: {
  volume: number | undefined
  trackNumber: number | undefined
}) {
  const [volume, setVolume] = useState(props.volume)
  const trackRef = useRef<any>(null)
  const thumbRef = useRef<any>(null)
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

  const calculateOffsets = (pageX: number) => {
    let volTrackWidth = trackRef?.current.getBoundingClientRect()['width']
    let volThumbTrackLEdge = trackRef?.current.getBoundingClientRect()['left']

    let volThumbWidth = volTrackWidth * 0.14375
    let volThumbTrackWidth = volTrackWidth - volThumbWidth
    let offsetX = pageX - volThumbTrackLEdge - volThumbWidth / 2
    if (offsetX < 0) {
      offsetX = 0
    }
    if (offsetX > volThumbTrackWidth) {
      offsetX = volThumbTrackWidth
    }
    let offsetX320 = offsetX * (320 / volTrackWidth)
    let volOutput = offsetX / volThumbTrackWidth
    let volOutputdB = Math.pow(volOutput, 4) * 4
    return [offsetX320, volOutputdB]
  }

  const sendVolumeChange = (vol: number) => {
    let url = `/_/SET/TRACK/${props.trackNumber}/SEND/0/VOL/${vol.toString()}`
    ReaperApiService.get(url)
  }

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    // Update coordinates
    if (mouseDown) {
      let [offset, vol] = calculateOffsets(event.pageX)
      setThumbOffset(offset)
      sendVolumeChange(vol)
    }
  }, [])

  const touchMoveHandler = useCallback((event: TouchEvent) => {
    // Update coordinates
    if (mouseDown) {
      let [offset, vol] = calculateOffsets(event.changedTouches[0].pageX)
      setThumbOffset(offset)
      sendVolumeChange(vol)
    }
  }, [])
  useEventListener('mousemove', mouseMoveHandler, trackRef.current)
  useEventListener('touchmove', touchMoveHandler, trackRef.current)
  useEventListener('mouseleave', mouseLeaveHandler, trackRef.current)
  useEventListener('mouseup', mouseUpHandler, trackRef.current)
  useEventListener('touchend', mouseUpHandler, trackRef.current)
  useEventListener('mousedown', mouseDownHandler, thumbRef.current)
  useEventListener('touchstart', mouseDownHandler, thumbRef.current)

  useEffect(() => {
    if (volume !== props.volume) {
      setVolume(props.volume)
      setThumbOffset(Math.pow(props.volume || 0, 1 / 4) * 194.68)
    }
  })

  const setThumbOffset = (offset: number) => {
    thumbOffset = offset
    let vteMove = 'translate(' + (offset || 0).toString() + ' 0)'
    thumbRef?.current.setAttributeNS(null, 'transform', vteMove)
  }

  return (
    <DivWrapper ref={trackRef}>
      <svg
        version="1.1"
        className="faderSvg"
        display="block"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 1 320 47"
        xmlSpace="preserve"
      >
        <rect x="0" fill="#333333" width="320" height="36" />
        <rect
          id="fader_track"
          x="23"
          y="16.7"
          transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 320 37.3333)"
          opacity="0.5"
          fill="#1A1A1A"
          width="274"
          height="4"
        />
        <g className="fader" ref={thumbRef}>
          <g>
            <linearGradient
              id="fGrad1"
              gradientUnits="userSpaceOnUse"
              x1="245.0833"
              y1="-114.0833"
              x2="245.0833"
              y2="-106.0833"
              gradientTransform="matrix(6.123234e-17 -1 -1 -6.123234e-17 -68.0833 263.0833)"
            >
              <stop offset="0" stopColor="#212121" />
              <stop offset="1" stopColor="#949494" />
            </linearGradient>
            <rect x="38" y="0.5" fill="url(#fGrad1)" width="8" height="35" />

            <linearGradient
              id="fGrad2"
              gradientUnits="userSpaceOnUse"
              x1="245.0833"
              y1="-106.0833"
              x2="245.0833"
              y2="-92.0833"
              gradientTransform="matrix(6.123234e-17 -1 -1 -6.123234e-17 -68.0833 263.0833)"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.9991" stopColor="#7A7A7A" />
            </linearGradient>
            <path
              fill="url(#fGrad2)"
              d="M26,0.5h12v35H26c-1.1,0-2-0.9-2-2v-31C24,1.4,24.9,0.5,26,0.5z"
            />

            <linearGradient
              id="fGrad3"
              gradientUnits="userSpaceOnUse"
              x1="245.0833"
              y1="-91.0833"
              x2="245.0833"
              y2="-77.0833"
              gradientTransform="matrix(6.123234e-17 -1 -1 -6.123234e-17 -68.0833 263.0833)"
            >
              <stop offset="0" stopColor="#9C9C9C" />
              <stop offset="1" stopColor="#4D4D4D" />
            </linearGradient>
            <path fill="url(#fGrad3)" d="M21,35.5c1.1,0,2-0.9,2-2v-31c0-1.1-0.9-2-2-2H9v35H21z" />

            <linearGradient
              id="fGrad4"
              gradientUnits="userSpaceOnUse"
              x1="245.0833"
              y1="-77.0833"
              x2="245.0833"
              y2="-69.0833"
              gradientTransform="matrix(6.123234e-17 -1 -1 -6.123234e-17 -68.0833 263.0833)"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.1231" stopColor="#F2F2F2" />
              <stop offset="0.3517" stopColor="#CFCFCF" />
              <stop offset="0.6607" stopColor="#979797" />
              <stop offset="1" stopColor="#525252" />
            </linearGradient>
            <rect x="1" y="0.5" fill="url(#fGrad4)" width="8" height="35" />
          </g>
          <path
            id="outline_1_"
            d="M1,0.5h20c1.1,0,2,0.9,2,2v31c0,1.1-0.9,2-2,2H1V0.5 M24,2.5c0-1.1,0.9-2,2-2h20v35H26c-1.1,0-2-0.9-2-2
                V2.5 M0.5,0v36H21c1.4,0,2.5-1.1,2.5-2.5c0,1.4,1.1,2.5,2.5,2.5h20.5V0H26c-1.4,0-2.5,1.1-2.5,2.5C23.5,1.1,22.4,0,21,0H0.5L0.5,0z
                "
          />
          <path
            opacity="0.1"
            fill="#FFFFFF"
            d="M2,1.5h19c0.6,0,1,0.4,1,1v31c0,0.6-0.4,1-1,1H2V1.5 M25,2.5
                c0-0.6,0.4-1,1-1h19v33H26c-0.6,0-1-0.4-1-1V2.5 M1,0.5v35h20c1.1,0,2-0.9,2-2v-31c0-1.1-0.9-2-2-2H1L1,0.5z M24,2.5v31
                c0,1.1,0.9,2,2,2h20v-35H26C24.9,0.5,24,1.4,24,2.5L24,2.5z"
          />

          <linearGradient
            id="fGrad5"
            gradientUnits="userSpaceOnUse"
            x1="245.0833"
            y1="-1061.0476"
            x2="245.0833"
            y2="-1058.0729"
            gradientTransform="matrix(6.123234e-17 -1 -1 -6.123234e-17 -1034.0834 263.0833)"
          >
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" />
          </linearGradient>
          <path
            opacity="0.33"
            fill="url(#fGrad5)"
            d="M26,35.5h1v-1h-1c-0.6,0-1-0.4-1-1v-31c0-0.6,0.4-1,1-1
                h1v-1h-1c-1,0-1.8,0.7-2,1.6v31.8C24.2,34.8,25,35.5,26,35.5z"
          />
        </g>
      </svg>
    </DivWrapper>
  )
}
const DivWrapper = styled.div`
  width: 100%
  background-color: black;
`
