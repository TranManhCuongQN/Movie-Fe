import { LoadingButton } from '@mui/lab'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Review } from 'src/types/review.type'
import useGlobalLoadingStore from 'src/zustand/globalLoading'
import { useMutation, useQuery } from 'react-query'
import reviewApi from 'src/api/modules/review.api'
import { routesURL } from 'src/routes/routes'
import uiConfigs from 'src/configs/ui.config'
import tmdbConfigs from 'src/api/configs/tmdb.configs'
import Container from 'src/components/common/Container'

const ReviewItem = ({ review, onRemoved }: { review: Review; onRemoved: (reviewId: string) => void }) => {
  const removeReviewMutation = useMutation({
    mutationFn: (reviewId: string) => reviewApi.remove(reviewId),
    onSuccess: (res) => {
      onRemoved(review.id as string)
      toast.dismiss()
      toast.success('Remove review success')
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  const onRemove = () => {
    removeReviewMutation.mutate(review.id as string)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 1,
        opacity: removeReviewMutation.isLoading ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' }
      }}
    >
      <Box sx={{ width: { xs: 0, md: '10%' } }}>
        <Link
          to={routesURL.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Box
            sx={{
              paddingTop: '160%',
              ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(review.mediaPoster))
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: 0, md: '0 2rem' }
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesURL.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: 'unset', textDecoration: 'none' }}
          >
            <Typography variant='h6' sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant='caption'>{dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant='contained'
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          right: { xs: 0, md: '10px' },
          marginTop: { xs: 2, md: 0 },
          width: 'max-content'
        }}
        startIcon={<DeleteIcon />}
        loadingPosition='start'
        loading={removeReviewMutation.isLoading}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </Box>
  )
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const setGlobalLoading = useGlobalLoadingStore((state) => state.setGlobalLoading)

  const skip = 2

  const { isLoading: isLoadingReview } = useQuery({
    queryKey: ['getReviews'],
    queryFn: () => reviewApi.list(),
    onSuccess: (res) => {
      setCount(res.data.length)
      setReviews([...res.data])
      setFilteredReviews([...res.data].slice(0, skip))
      setGlobalLoading(false)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
      setGlobalLoading(false)
    }
  })

  useEffect(() => {
    if (isLoadingReview) {
      setGlobalLoading(true)
    }
  }, [isLoadingReview, setGlobalLoading])

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...reviews].splice(page * skip, skip)])
    setPage(page + 1)
  }

  const onRemoved = (id: string) => {
    const newReviews = [...reviews].filter((e) => e.id !== id)
    setReviews(newReviews)
    setFilteredReviews([...newReviews].splice(0, page * skip))
    setCount(count - 1)
  }

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && <Button onClick={onLoadMore}>load more</Button>}
        </Stack>
      </Container>
    </Box>
  )
}

export default ReviewList
