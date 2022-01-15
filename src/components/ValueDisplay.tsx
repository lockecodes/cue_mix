import React from 'react'
import { Typography } from '@material-ui/core'
import { useStore } from 'services/store/hook'

const ValueDisplay: React.FC = () => {
  const { value } = useStore()
  return <Typography variant="body1">{`Value: ${value}`}</Typography>
}

export default ValueDisplay
