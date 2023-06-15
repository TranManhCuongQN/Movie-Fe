import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import useAuthModalStore from 'src/zustand/authModal'
import Logo from './Logo'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'

const actionState = {
  signin: 'signin',
  signup: 'signup'
}

const AuthModal = () => {
  const authModalOpen = useAuthModalStore((state) => state.authModalOpen)
  const setAuthModelOpen = useAuthModalStore((state) => state.setAuthModalOpen)

  const [action, setAction] = useState(actionState.signin)

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin)
  }, [authModalOpen])

  const handleClose = () => setAuthModelOpen(false)

  const switchAuthState = (state: string) => setAction(state)

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
          zIndex: 9999
        }}
      >
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>

          {action === actionState.signin && <SigninForm switchAuthState={() => switchAuthState(actionState.signup)} />}

          {action === actionState.signup && <SignupForm switchAuthState={() => switchAuthState(actionState.signin)} />}
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal
