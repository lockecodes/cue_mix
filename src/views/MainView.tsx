import React from 'react'
import { Typography } from '@material-ui/core'
import MixSelect from 'components/MixSelect'

export default function MainView() {
  return (
    <>
      <Typography variant="h4">Cue Mix Selection</Typography>
      <MixSelect />
    </>
  )
}
