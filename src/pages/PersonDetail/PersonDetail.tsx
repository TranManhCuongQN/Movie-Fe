import { Toolbar, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import tmdbConfigs from 'src/api/configs/tmdb.configs'
import personApi from 'src/api/modules/person.api'
import Container from 'src/components/common/Container'
import PersonMediaGrid from 'src/components/common/PersonMediaGrid'
import uiConfigs from 'src/configs/ui.config'
import { Person } from 'src/types/person.type'
import useGlobalLoadingStore from 'src/zustand/globalLoading'

const PersonDetail = () => {
  const { personId } = useParams()
  const setGlobalLoading = useGlobalLoadingStore((state) => state.setGlobalLoading)
  const [person, setPerson] = useState<Person | null>(null)

  const { isLoading: isLoadingPersonDetail } = useQuery({
    queryKey: ['personDetail', { personId }],
    queryFn: () => personApi.detail(personId as string),
    onSuccess: (res) => {
      // console.log(res.data)
      setPerson(res.data)
      setGlobalLoading(false)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
      setGlobalLoading(false)
    }
  })

  useEffect(() => {
    if (isLoadingPersonDetail) {
      setGlobalLoading(true)
    }
  }, [isLoadingPersonDetail, setGlobalLoading])

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
              }}
            >
              <Box
                sx={{
                  width: { xs: '50%', md: '20%' }
                }}
              >
                <Box
                  sx={{
                    paddingTop: '160%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'darkgrey',
                    backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', md: '80%' },
                  padding: { xs: '1rem 0', md: '1rem 2rem' }
                }}
              >
                <Stack spacing={2}>
                  <Typography variant='h5' fontWeight='700'>
                    {`${person.name} (${person.birthday && person.birthday.split('-')[0]}`}
                    {person.deathday && ` - ${person.deathday && person.deathday.split('-')[0]}`}
                    {')'}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>{person.biography}</Typography>
                </Stack>
              </Box>
            </Box>
            <Container header='medias'>
              <PersonMediaGrid personId={personId as string} />
            </Container>
          </Box>
        </>
      )}
    </>
  )
}

export default PersonDetail
