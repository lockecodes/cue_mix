import React, { Dispatch, useReducer } from 'react'

type Action = { type: 'SET_VALUE'; value: boolean }

type State = {
  value: boolean
}

const initialState: State = {
  value: false,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.value,
      }
  }
}

type StoreContextValue = State & {
  dispatch: Dispatch<Action>
}

const contextInitialValue: StoreContextValue = {
  ...initialState,
  dispatch: () => {},
}

export const StoreContext = React.createContext<StoreContextValue>(contextInitialValue)

export const StoreProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState)

  return <StoreContext.Provider value={{ ...store, dispatch }}>{children}</StoreContext.Provider>
}
