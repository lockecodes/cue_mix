import { useContext } from 'react'
import { StoreContext } from 'services/store/provider'

export const useStore = () => {
  const { value, dispatch } = useContext(StoreContext)

  const setValue = (value: boolean) => {
    dispatch({ type: 'SET_VALUE', value })
  }

  return {
    value,
    setValue,
  }
}
