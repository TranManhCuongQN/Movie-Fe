/* eslint-disable jsx-a11y/no-autofocus */
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, TextField, Toolbar } from '@mui/material'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import mediaApi from 'src/api/modules/media.api'
import { movie } from 'src/types/movie.type'
import { toast } from 'react-toastify'
import uiConfigs from 'src/configs/ui.config'
import MediaGrid from 'src/components/common/MediaGrid'
import { Helmet } from 'react-helmet-async'

const mediaTypes = ['movie', 'tv', 'people']
let timer: any
const timeout = 500

const MediaSearch = () => {
  const [query, setQuery] = useState<string>('')
  const [onSearch, setOnSearch] = useState<boolean>(false)
  const [mediaType, setMediaType] = useState<string>(mediaTypes[0])
  const [medias, setMedias] = useState<movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [callApi, setCallApi] = useState<boolean>(false)

  const { isLoading: isLoadingSearch } = useQuery({
    queryKey: ['search', { mediaType, query, page }],
    queryFn: () => mediaApi.search({ mediaType, query, page }),
    onSuccess: (res) => {
      if (page > 1) {
        setMedias((m) => [...m, ...res.data.results])
      } else {
        setMedias([...res.data.results])
      }
      setOnSearch(false)
      setCallApi(false)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
      setOnSearch(false)
      setCallApi(false)
    },
    enabled: Boolean(callApi)
  })

  useEffect(() => {
    if (isLoadingSearch) {
      setOnSearch(true)
    }
  }, [isLoadingSearch])

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([])
      setPage(1)
    } else {
      setCallApi(true)
    }
  }, [query, mediaType, page])

  useEffect(() => {
    setMedias([])
    setPage(1)
  }, [mediaType])

  const onCategoryChange = (selectedCategory: string) => setMediaType(selectedCategory)

  const onQueryChange = (e: any) => {
    const newQuery = e.target.value
    clearTimeout(timer)

    timer = setTimeout(() => {
      setQuery(newQuery)
    }, timeout)
  }

  return (
    <>
      <Helmet>
        <title>Search Page</title>
        <meta name='description' content='Search Page - Movie' />
      </Helmet>

      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction='row' justifyContent='center' sx={{ width: '100%' }}>
            {mediaTypes.map((item, index) => (
              <Button
                size='large'
                key={index}
                variant={mediaType === item ? 'contained' : 'text'}
                sx={{
                  color: mediaType === item ? 'primary.contrastText' : 'text.primary'
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color='success'
            placeholder='Search MoonFlix'
            sx={{ width: '100%' }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  )
}

export default MediaSearch
