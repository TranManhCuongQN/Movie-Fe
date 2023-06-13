import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import userApi from 'src/api/modules/user.api'
import useAuthStore from 'src/zustand/auth'
import useAuthModalStore from 'src/zustand/authModal'
import { User } from 'src/types/user.type'
import { toast } from 'react-toastify'
import { Box, Stack } from '@mui/system'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

import InputField from './InputField'
import { Alert, Button, IconButton, InputAdornment } from '@mui/material'

interface SignInFormProps {
  switchAuthState: () => void
}

interface FormData {
  username: string
  password: string
}

const SigninForm = ({ switchAuthState }: SignInFormProps) => {
  const setUser = useAuthStore((state) => state.setUser)
  const setAuthModal = useAuthModalStore((state) => state.setAuthModalOpen)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const schema = yup.object({
    username: yup.string().required('username is required').min(8, 'username minimum 8 characters'),
    password: yup.string().required('password is required').min(8, 'password minimum 8 characters')
  })

  const { handleSubmit, reset, control } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const signinMutation = useMutation({
    mutationFn: (body: FormData) => userApi.signin(body),
    onSuccess: (res) => {
      setUser(res.data as User)
      setAuthModal(false)
      toast.dismiss()
      toast.success('Sign in success')
      reset()
    },
    onError: (error: any) => {
      setErrorMessage(error.message)
    }
  })

  const onSubmit = handleSubmit((data) => {
    signinMutation.mutate(data)
  })

  return (
    <Box component='form' onSubmit={onSubmit}>
      <Stack spacing={3}>
        {/* username */}
        <InputField
          type='text'
          placeholder='Username'
          name='username'
          fullWidth
          control={control}
          color='success'
          label='Username'
        />

        {/* password */}
        <InputField
          name='password'
          label='Password'
          control={control}
          color='success'
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* button signin */}
        <LoadingButton
          type='submit'
          fullWidth
          size='large'
          variant='contained'
          sx={{
            marginTop: 4
          }}
          loading={signinMutation.isLoading}
        >
          Sign in
        </LoadingButton>

        <Button
          fullWidth
          type='button'
          sx={{
            marginTop: 1
          }}
          onClick={() => switchAuthState()}
        >
          sign up
        </Button>

        {/* inform error */}
        {errorMessage && (
          <Box sx={{ marginBox: 2 }}>
            <Alert severity='error' variant='outlined'>
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  )
}

export default SigninForm
