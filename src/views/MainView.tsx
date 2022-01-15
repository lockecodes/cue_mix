import React from 'react'
import { Button, Typography } from '@material-ui/core'
import ValueDisplay from 'components/ValueDisplay'
import { useStore } from 'services/store'

const MainView: React.FC = () => {
  const { value, setValue } = useStore()

  const handleToggleValue = () => {
    setValue(!value)
  }

  return (
    <>
      <Typography variant="h4">Main View</Typography>
      <ValueDisplay />
      <Button onClick={handleToggleValue} variant="contained" color="primary">
        Toggle
      </Button>
    </>
  )
}

export default MainView
