import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import { movie } from 'src/types/movie.type'
import usePrevious from 'src/hooks/usePrevious'
import useAppStateStore from 'src/zustand/appState'
import useGlobalLoadingStore from 'src/zustand/globalLoading'
import { useQuery } from 'react-query'
import mediaApi from 'src/api/modules/media.api'
import HeroSlide from 'src/components/common/HeroSlide'
import uiConfigs from 'src/configs/ui.config'
import tmdbConfigs from 'src/api/configs/tmdb.configs'
import MediaGrid from 'src/components/common/MediaGrid'

const MediaList = () => {
  const { mediaType } = useParams()
  const setAppState = useAppStateStore((state) => state.setAppState)
  const setGlobalLoading = useGlobalLoadingStore((state) => state.setGlobalLoading)

  const [medias, setMedias] = useState<movie[]>([])
  const [currCategory, setCurrCategory] = useState<number>(0)
  const [currPage, setCurrPage] = useState<number>(1)
  const [mediaLoading, setMediaLoading] = useState<boolean>(false)

  const prevMediaType = usePrevious(mediaType)
  const mediaCategories = useMemo(() => ['popular', 'top_rated'], [])
  const category = useMemo(() => ['popular', 'top_rated'], [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    setAppState(mediaType as string)
  }, [mediaType, setAppState])

  const { isLoading: isLoadingMedia } = useQuery({
    queryKey: ['getMedias', { mediaType, mediaCategory: mediaCategories[currCategory], page: currPage }],
    queryFn: () =>
      mediaApi.list({
        mediaType: mediaType as string,
        mediaCategory: mediaCategories[currCategory],
        page: currPage
      }),
    onSuccess: (res) => {
      setGlobalLoading(false)
      if (currPage !== 1) {
        setMedias([...medias, ...res.data.results])
      } else {
        setMedias([...res.data.results])
      }
      setMediaLoading(false)
      // console.log('MediaDetail', res.data)
    },
    onError: (err: any) => {
      setGlobalLoading(false)
      toast.dismiss()
      toast.error(err.message)
      setMediaLoading(false)
    }
  })

  useEffect(() => {
    if (isLoadingMedia && currPage === 1) {
      setGlobalLoading(true)
    }
  }, [isLoadingMedia, setGlobalLoading, currPage])

  useEffect(() => {
    if (isLoadingMedia) {
      setMediaLoading(isLoadingMedia)
    }
  }, [isLoadingMedia])

  useEffect(() => {
    if (prevMediaType !== mediaType) {
      setCurrCategory(0)
      setCurrPage(1)
    }
  }, [prevMediaType, mediaType])

  const onCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return
    setMedias([])
    setCurrPage(1)
    setCurrCategory(categoryIndex)
  }

  const onLoadMore = () => setCurrPage(currPage + 1)

  return (
    <>
      <HeroSlide mediaType={mediaType as string} mediaCategory={mediaCategories[currCategory]} />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='space-between'
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight='700' variant='h5'>
            {mediaType === tmdbConfigs.mediaType.movie ? 'Movies' : 'TV Series'}
          </Typography>
          <Stack direction='row' spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size='large'
                variant={currCategory === index ? 'contained' : 'text'}
                sx={{
                  color: currCategory === index ? 'primary.contrastText' : 'text.primary'
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType as string} />
        <LoadingButton sx={{ marginTop: 8 }} fullWidth color='primary' loading={mediaLoading} onClick={onLoadMore}>
          load more
        </LoadingButton>
      </Box>
    </>
  )
}

export default MediaList
