import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import tmdbConfigs from 'src/api/configs/tmdb.configs'
import favoriteApi from 'src/api/modules/favorite.api'
import mediaApi from 'src/api/modules/media.api'
import BackdropSlide from 'src/components/common/BackdropSlide'
import CastSlide from 'src/components/common/CastSlide'
import CircularRate from 'src/components/common/CircularRate'
import Container from 'src/components/common/Container'
import ImageHeader from 'src/components/common/ImageHeader'
import MediaReview from 'src/components/common/MediaReview'
import MediaSlide from 'src/components/common/MediaSlide'
import MediaVideosSlide from 'src/components/common/MediaVideoSlide'
import PosterSlide from 'src/components/common/PosterSlide'
import RecommendSlide from 'src/components/common/RecommendSlide'
import uiConfigs from 'src/configs/ui.config'
import { Favorite } from 'src/types/favorites.type'
import { genre } from 'src/types/genres.type'
import { movie } from 'src/types/movie.type'
import useAuthStore from 'src/zustand/auth'
import useAuthModalStore from 'src/zustand/authModal'
import useGlobalLoadingStore from 'src/zustand/globalLoading'

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams()
  const user = useAuthStore((state) => state.user)
  const listFavorites = useAuthStore((state) => state.listFavorites)
  const setAuthModalOpen = useAuthModalStore((state) => state.setAuthModalOpen)
  const setGlobalLoading = useGlobalLoadingStore((state) => state.setGlobalLoading)
  const removeFavorite = useAuthStore((state) => state.removeFavorite)
  const addFavorite = useAuthStore((state) => state.addFavorite)

  const [media, setMedia] = useState<movie | null>(null)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [onRequest, setOnRequest] = useState<boolean>(false)
  const [genres, setGenres] = useState<genre[]>([])

  const videoRef = useRef<HTMLDivElement | null>(null)
  const favorite = listFavorites.find((e) => e.mediaId.toString() === (mediaId as string)?.toString())

  const { isLoading: isLoadingMediaDetail } = useQuery({
    queryKey: ['getMediaDetail', { mediaType, mediaId }],
    queryFn: () => mediaApi.detail({ mediaId, mediaType }),
    onSuccess: (res) => {
      setGlobalLoading(false)
      // console.log('MediaDetail', res.data)
      setMedia(res.data)
      setGenres(res.data.genres)
      setIsFavorite(res.data.isFavorite)
    },
    onError: (err: any) => {
      setGlobalLoading(false)
      toast.dismiss()
      toast.error(err.message)
    }
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if (isLoadingMediaDetail) {
      setGlobalLoading(true)
    }
  }, [isLoadingMediaDetail, setGlobalLoading])

  const addFavoriteMutation = useMutation({
    mutationFn: (body: Favorite) => favoriteApi.add(body),
    onSuccess: (res) => {
      // console.log('addFavoriteMutation', res.data)
      addFavorite(res.data)
      toast.dismiss()
      toast.success('Add favorite success')
      setIsFavorite(true)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: (favoriteId: string) => favoriteApi.remove(favoriteId),
    onSuccess: (res) => {
      // console.log('removeFavoriteMutation', res.data)
      removeFavorite(favorite as Favorite)
      setIsFavorite(false)
      setOnRequest(false)
      toast.dismiss()
      toast.success('Remove favorite success')
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  const onFavoriteClick = async () => {
    if (!user) return setAuthModalOpen(true)

    if (onRequest) return

    if (isFavorite) {
      onRemoveFavorite()
      return
    }

    setOnRequest(true)

    if (media) {
      const body = {
        mediaId: String(media.id),
        mediaTitle: media.title || media.name,
        mediaType: mediaType as string,
        mediaPoster: media.poster_path,
        mediaRate: media.vote_average
      }

      addFavoriteMutation.mutate(body)

      setOnRequest(false)
    }
  }

  const onRemoveFavorite = async () => {
    if (onRequest) return
    setOnRequest(true)

    removeFavoriteMutation.mutate((favorite as Favorite)?.id as string)
  }

  return media ? (
    <>
      <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />

      <Box
        sx={{
          color: 'primary.contrastText',
          ...uiConfigs.style.mainContent
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' }
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: '70%', sm: '50%', md: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' }
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                }}
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                color: 'text.primary'
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant='h4'
                  fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                  fontWeight='700'
                  sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split('-')[0]
                      : media.first_air_date.split('-')[0]
                  }`}
                </Typography>
                {/* title */}

                {/* rate and genres */}
                <Stack direction='row' spacing={1} alignItems='center'>
                  {/* rate */}
                  <CircularRate value={media.vote_average} />
                  {/* rate */}
                  <Divider orientation='vertical' />
                  {/* genres */}
                  {genres.map((genre, index) => (
                    <Chip label={genre.name} variant='filled' color='primary' key={index} />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}

                {/* overview */}
                <Typography variant='body1' sx={{ ...uiConfigs.style.typoLines(5) }}>
                  {media.overview}
                </Typography>
                {/* overview */}

                {/* buttons */}
                <Stack direction='row' spacing={1}>
                  <LoadingButton
                    variant='text'
                    sx={{
                      width: 'max-content',
                      '& .MuiButon-starIcon': { marginRight: '0' }
                    }}
                    size='large'
                    startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                    loadingPosition='start'
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant='contained'
                    sx={{ width: 'max-content' }}
                    size='large'
                    startIcon={<PlayArrowIcon />}
                    onClick={() =>
                      (videoRef?.current as HTMLDivElement).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  >
                    watch now
                  </Button>
                </Stack>
                {/* buttons */}

                {/* cast */}
                <Container header='Cast'>
                  <CastSlide casts={media.credits.cast} />
                </Container>
                {/* cast */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}

        {/* media videos */}
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header='Videos'>
            <MediaVideosSlide videos={[...media.videos.results]} />
          </Container>
        </div>
        {/* media videos */}

        {/* media backdrop */}
        {media.images.backdrops.length > 0 && (
          <Container header='backdrops'>
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {media.images.posters.length > 0 && (
          <Container header='posters'>
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}
        {/* media posters */}

        {/* media reviews */}
        <MediaReview reviews={media.reviews} media={media} mediaType={mediaType as string} />
        {/* media reviews */}

        {/* media recommendation */}
        <Container header='you may also like'>
          {media.recommend.length > 0 && <RecommendSlide medias={media.recommend} mediaType={mediaType as string} />}
          {media.recommend.length === 0 && (
            <MediaSlide mediaType={mediaType as string} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
          )}
        </Container>
        {/* media recommendation */}
      </Box>
    </>
  ) : null
}

export default MediaDetail
