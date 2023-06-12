import React, { useEffect } from 'react'
import useAuthStore from 'src/zustand/auth'
import useAuthModalStore from 'src/zustand/authModal'

const ProtectedPage = ({ children }: { children: React.ReactElement }) => {
  const user = useAuthStore((state) => state.user)

  const setAuthModelOpen = useAuthModalStore((state) => state.setAuthModalOpen)

  useEffect(() => {
    setAuthModelOpen(!user)
  }, [user, setAuthModelOpen])

  return user ? children : null
}

export default ProtectedPage
