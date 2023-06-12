import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageWrapper = ({ children }: { children: React.ReactElement }) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

export default PageWrapper
