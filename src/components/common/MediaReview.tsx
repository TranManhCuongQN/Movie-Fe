import { LoadingButton } from '@mui/lab'
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import reviewApi from '../../api/modules/review.api'
import TextAvatar from './TextAvatar'
import { movie } from 'src/types/movie.type'
import useAuthStore from 'src/zustand/auth'
import Container from './Container'
import { useMutation } from 'react-query'
import { Review } from 'src/types/review.type'
import { User } from 'src/types/user.type'

const ReviewItem = ({ review, onRemoved }: { review: Review; onRemoved: (reviewId: string) => void }) => {
  const user = useAuthStore((state) => state.user)

  const [onRequest, setOnRequest] = useState<boolean>(false)

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

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    removeReviewMutation.mutate(review.id as string)
  }

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: '5px',
        position: 'relative',
        opacity: onRequest ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' }
      }}
    >
      <Stack direction='row' spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.user?.displayName as string} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant='h6' fontWeight='700'>
              {review.user?.displayName}
            </Typography>
            <Typography variant='caption'>{dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Typography>
          </Stack>
          <Typography variant='body1' textAlign='justify'>
            {review.content}
          </Typography>
          {user && user.id === (review.user as User).id && (
            <LoadingButton
              variant='contained'
              startIcon={<DeleteIcon />}
              loadingPosition='start'
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                right: { xs: 0, md: '10px' },
                marginTop: { xs: 2, md: 0 },
                width: 'max-content'
              }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

const MediaReview = ({ reviews, media, mediaType }: { reviews: Review[]; media: movie; mediaType: string }) => {
  const user = useAuthStore((state) => state.user)
  const [listReviews, setListReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [page, setPage] = useState<number>(1)
  const [onRequest, setOnRequest] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [reviewCount, setReviewCount] = useState<number>(0)

  const addReviewMutation = useMutation({
    mutationFn: (body: Review) => reviewApi.add(body),
    onSuccess: (res) => {
      // console.log('addReview:', res.data)
      toast.dismiss()
      toast.success('Post review success')
      setFilteredReviews([...filteredReviews, res.data])
      setReviewCount(reviewCount + 1)
      setContent('')
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  const skip = 4

  useEffect(() => {
    setListReviews([...reviews])
    setFilteredReviews([...reviews].splice(0, skip))
    setReviewCount(reviews.length)
  }, [reviews])

  const onAddReview = async () => {
    if (onRequest) return
    setOnRequest(true)

    const body = {
      content,
      mediaId: String(media.id),
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path
    }

    addReviewMutation.mutate(body)

    setOnRequest(false)
  }

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...listReviews].splice(page * skip, skip)])
    setPage(page + 1)
  }

  const onRemoved = (id: string) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id)
      setListReviews(newListReviews)
      setFilteredReviews([...newListReviews].splice(0, page * skip))
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id))
    }

    setReviewCount(reviewCount - 1)

    toast.success('Remove review success')
  }

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) =>
            item.user ? (
              <Box key={item.id}>
                <ReviewItem review={item} onRemoved={onRemoved} />
                <Divider
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}
                />
              </Box>
            ) : null
          )}
          {filteredReviews.length < listReviews.length && <Button onClick={onLoadMore}>load more</Button>}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction='row' spacing={2}>
              <TextAvatar text={user.displayName as string} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant='h6' fontWeight='700'>
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder='Write your review'
                  variant='outlined'
                />
                <LoadingButton
                  variant='contained'
                  size='large'
                  sx={{ width: 'max-content' }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition='start'
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  )
}

export default MediaReview
