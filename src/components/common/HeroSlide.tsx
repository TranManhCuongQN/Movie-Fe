import React, { useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useQuery } from 'react-query'
import mediaApi from 'src/api/modules/media.api'
import { toast } from 'react-toastify'
import useGlobalLoadingStore from 'src/zustand/globalLoading'
import genreApi from 'src/api/modules/genre.api'
import { movie } from 'src/types/movie.type'
import { genre } from 'src/types/genres.type'
import uiConfigs from 'src/configs/ui.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbConfigs from 'src/api/configs/tmdb.configs'
import CircularRate from './CircularRate'
import { Link } from 'react-router-dom'
import { routesURL } from 'src/routes/routes'
import { Autoplay } from 'swiper'

interface HeroSlideProps {
  mediaType: string
  mediaCategory: string
}
const HeroSlide = ({ mediaCategory, mediaType }: HeroSlideProps) => {
  const theme = useTheme()
  const setGlobalLoading = useGlobalLoadingStore((state) => state.setGlobalLoading)

  const [movies, setMovies] = React.useState<movie[]>([])
  const [genres, setGenres] = React.useState<genre[]>([])

  const { data: dataMedias } = useQuery({
    queryKey: ['getMedias', { mediaType, mediaCategory }],
    queryFn: () => mediaApi.list({ mediaType, mediaCategory, page: 1 }),

    onSuccess: (res) => {
      // console.log('media:', res.data.results)
      setMovies(res.data.results)
      setGlobalLoading(false)
    },
    onError: (err: any) => {
      // console.log('errorMedias:', err)
      toast.dismiss()
      toast.error(err.message)
      setGlobalLoading(false)
    }
  })

  const { data: dataGenres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ['getGenres', { mediaType }],
    queryFn: () => genreApi.getList(mediaType),
    onSuccess: (res) => {
      setGenres(res.data.genres)
      // console.log('genres:', res.data.genres)
    },
    onError: (err: any) => {
      // console.log('errorGenres:', err)
      toast.dismiss()
      toast.error(err.message)
    }
  })

  useEffect(() => {
    if (isLoadingGenres) {
      setGlobalLoading(true)
    }
  }, [isLoadingGenres, setGlobalLoading])

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'primary.contrastText',
        '&::before': {
          content: '""',
          width: '100%',
          height: '30%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          ...uiConfigs.style.gradientByImage[theme.palette.mode]
        }
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: '100%', height: 'max-content' }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: '130%',
                  sm: '80%',
                  md: '60%',
                  lg: '45%'
                },
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientByImage[theme.palette.mode]
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                paddingX: { sm: '10px', md: '5rem', lg: '10rem' }
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingX: '30px',
                  color: 'text.primary',
                  width: { sm: 'unset', md: '30%', lg: '40%' }
                }}
              >
                <Stack spacing={4} direction='column'>
                  {/* title */}
                  <Typography
                    variant='h4'
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight='700'
                    sx={{
                      ...uiConfigs.style.typoLines(2, 'left')
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* title */}

                  <Stack direction='row' spacing={1} alignItems='center'>
                    {/* rating */}
                    <CircularRate value={movie.vote_average} />
                    {/* rating */}

                    <Divider orientation='vertical' />
                    {/* genres */}
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant='filled'
                        color='primary'
                        key={index}
                        label={genres.find((e) => e.id === genreId) && genres.find((e) => e.id === genreId)?.name}
                      />
                    ))}
                    {/* genres */}
                  </Stack>

                  {/* overview */}
                  <Typography
                    variant='body1'
                    sx={{
                      ...uiConfigs.style.typoLines(3)
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant='contained'
                    size='large'
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesURL.mediaDetail(mediaType, String(movie.id))}
                    sx={{ width: 'max-content' }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default HeroSlide
