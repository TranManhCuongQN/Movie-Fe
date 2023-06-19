import { LoadingButton } from '@mui/lab'
import { Box, Stack, InputAdornment, IconButton } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import Container from 'src/components/common/Container'
import uiConfigs from 'src/configs/ui.config'
import useAuthStore from 'src/zustand/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userApi from 'src/api/modules/user.api'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import InputField from 'src/components/common/InputField'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useAuthModalStore from 'src/zustand/authModal'
import { Helmet } from 'react-helmet-async'

interface FormData {
  password: string
  newPassword: string
  confirmNewPassword: string
}
const PasswordUpdate = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()
  const setAuthModal = useAuthModalStore((state) => state.setAuthModalOpen)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState<boolean>(false)

  const schema = yup.object({
    password: yup.string().required('password is required').min(8, 'password minimum 8 characters'),
    newPassword: yup.string().required('new password is required').min(8, 'new password minimum 8 characters'),
    confirmNewPassword: yup
      .string()
      .required('confirm password is required')
      .min(8, 'confirm password minimum 8 characters')
      .oneOf([yup.ref('newPassword')], 'confirm password must match')
  })

  const { handleSubmit, reset, control } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (body: FormData) => userApi.passwordUpdate(body),
    onSuccess: (res) => {
      reset()
      navigate('/')
      setUser(null)
      setAuthModal(true)
      toast.dismiss()
      toast.success('Update password success! Please re-login')
    },
    onError: (error: any) => {
      toast.dismiss()
      toast.error(error.message)
    }
  })

  const onSubmit = handleSubmit((data: FormData) => {
    updatePasswordMutation.mutate(data)
  })

  return (
    <>
      <Helmet>
        <title>Password Update Page</title>
        <meta name='description' content='Password Update Page - Movie' />
      </Helmet>

      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Container header='update password'>
          <Box component='form' maxWidth='400px' onSubmit={onSubmit}>
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

            <InputField
              name='newPassword'
              label='New password'
              control={control}
              color='success'
              placeholder='New password'
              type={showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge='end'
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <InputField
              name='confirmNewPassword'
              label='Confirm new password'
              control={control}
              color='success'
              placeholder='Confirm new password'
              type={showConfirmNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      edge='end'
                    >
                      {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Stack spacing={2}>
              <LoadingButton
                type='submit'
                variant='contained'
                fullWidth
                sx={{ marginTop: 4 }}
                loading={updatePasswordMutation.isLoading}
              >
                update password
              </LoadingButton>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default PasswordUpdate
