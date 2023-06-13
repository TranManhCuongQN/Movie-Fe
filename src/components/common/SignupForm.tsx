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

interface SignupFormProps {
  switchAuthState: () => void
}

interface FormData {
  username: string
  password: string
  displayName: string
  confirmPassword: string
}

const SignupForm = ({ switchAuthState }: SignupFormProps) => {
  const setUser = useAuthStore((state) => state.setUser)
  const setAuthModal = useAuthModalStore((state) => state.setAuthModalOpen)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)

  const schema = yup.object({
    username: yup.string().required('username is required').min(8, 'username minimum 8 characters'),
    password: yup.string().required('password is required').min(8, 'password minimum 8 characters'),
    displayName: yup.string().required('displayName is required').min(8, 'displayName minimum 8 characters'),
    confirmPassword: yup
      .string()
      .required('confirmPassword is required')
      .min(8, 'confirmPassword minimum 8 characters')
      .oneOf([yup.ref('password')], 'Confirm Password not match')
  })

  const { handleSubmit, reset, control } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      displayName: '',
      confirmPassword: ''
    }
  })

  const signupMutation = useMutation({
    mutationFn: (body: { username: string; password: string; displayName: string }) => userApi.signup(body),
    onSuccess: (res) => {
      setUser(res.data as User)
      setAuthModal(false)
      toast.dismiss()
      toast.success('Sign up success')
      reset()
    },
    onError: (error: any) => {
      setErrorMessage(error.message)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const formData = {
      username: data.username,
      password: data.password,
      displayName: data.displayName
    }
    signupMutation.mutate(formData)
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

        {/* displayName */}
        <InputField
          type='text'
          placeholder='Display name'
          name='displayName'
          fullWidth
          control={control}
          color='success'
          label='Display name'
        />

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

        <InputField
          name='confirmPassword'
          label='Confirm password'
          control={control}
          placeholder='Confirm password'
          color='success'
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge='end'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <LoadingButton
          type='submit'
          fullWidth
          size='large'
          variant='contained'
          sx={{
            marginTop: 4
          }}
          loading={signupMutation.isLoading}
        >
          Sign up
        </LoadingButton>

        <Button
          fullWidth
          type='button'
          sx={{
            marginTop: 1
          }}
          onClick={() => switchAuthState()}
        >
          sign in
        </Button>

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

export default SignupForm
