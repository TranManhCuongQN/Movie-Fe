import React, { useEffect } from 'react'
import useAppStateStore from 'src/zustand/appState'

const PageWrapper = ({ children, state }: { children: React.ReactElement; state: string }) => {
  const appState = useAppStateStore((state) => state.appState)
  const setAppState = useAppStateStore((state) => state.setAppState)

  useEffect(() => {
    window.scrollTo(0, 0)
    setAppState(state)
  }, [appState, setAppState, state])

  return children
}

export default PageWrapper
