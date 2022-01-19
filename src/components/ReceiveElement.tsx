import React from 'react'
import ISend from '../types/Send'

export default function ReceiveElement(props: { receive: ISend }) {
  const makeVolumeString = (volume: string) => {
    let v = parseFloat(volume)
    if (v < 0.00000002980232) return '-inf dB'
    v = Math.log(v) * 8.68588963806
    return v.toFixed(2) + ' dB'
  }

  return (
    <div>
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
        <path
          className="sendBg"
          fill="#262626"
          d="M244,0c-0.3,0-0.7,0-1,0v0H142h-17H27v0c-0.3,0-0.7,0-1,0C13.8,0,4,9.8,4,22s9.8,22,22,22
            c0.3,0,0.7,0,1,0v0h98h17h101v0c0.3,0,0.7,0,1,0c12.2,0,22-9.8,22-22S256.2,0,244,0z"
        />
        <line
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
          {props.receive.otherTrack?.trackName || 'Track Name'}
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
          xx dB
        </text>
        <circle
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

        <g className="send_mute button">
          <g className="send_mute_off" visibility="visible">
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
          <g className="send_mute_on" visibility="hidden">
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
