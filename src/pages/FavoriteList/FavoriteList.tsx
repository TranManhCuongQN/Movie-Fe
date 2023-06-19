import { LoadingButton } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import favoriteApi from 'src/api/modules/favorite.api'
import MediaItem from 'src/components/common/MediaItem'
import useAuthStore from 'src/zustand/auth'
import useGlobalLoadingStore from 'src/zustand/globalLoading'
import DeleteIcon from '@mui/icons-material/Delete'
import { Favorite } from 'src/types/favorites.type'
import { Box } from '@mui/system'
import uiConfigs from 'src/configs/ui.config'
import { Grid } from '@mui/material'
import { Button } from '@mui/base'
import Container from 'src/components/common/Container'
import { Helmet } from 'react-helmet-async'

const FavoriteItem = ({ media, onRemoved }: { media: Favorite; onRemoved: (favoriteId: string) => void }) => {
  const removeFavorite = useAuthStore((state) => state.removeFavorite)

  const removeFavoriteMutation = useMutation({
    mutationFn: (favoriId: string) => favoriteApi.remove(favoriId),
    onSuccess: (res) => {
      toast.dismiss()
      toast.success('Remove favorite success')
      removeFavorite(media)
      onRemoved(media.id as string)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  const onRemove = () => {
    removeFavoriteMutation.mutate(String(media.id))
  }

  return (
    <>
      <Helmet>
        <title>Favorite List Page</title>
        <meta name='description' content='Favorite List Page - Movie' />
      </Helmet>

      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant='contained'
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition='start'
        loading={removeFavoriteMutation.isLoading}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  )
}

const FavoriteList = () => {
  const [medias, setMedias] = useState<Favorite[]>([])
  const [filteredMedias, setFilteredMedias] = useState<Favorite[]>([])
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const setGlobalLoading = useGlobalLoadingStore((state) => state.setGlobalLoading)

  const skip = 8

  const { isLoading: isLoadingFavoriteList } = useQuery({
    queryKey: ['favoriteList'],
    queryFn: () => favoriteApi.getList(),
    onSuccess: (res) => {
      setMedias(res.data)
      setFilteredMedias(res.data.slice(0, skip))
      setCount(res.data.length)
      setGlobalLoading(false)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
      setGlobalLoading(false)
    }
  })

  useEffect(() => {
    if (isLoadingFavoriteList) {
      setGlobalLoading(true)
    }
  }, [isLoadingFavoriteList, setGlobalLoading])

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)])
    setPage(page + 1)
  }

  const onRemoved = (id: string) => {
    const newMedias = [...medias].filter((e) => e.id !== id)
    setMedias(newMedias)
    setFilteredMedias([...newMedias].splice(0, page * skip))
    setCount(count - 1)
  }

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && <Button onClick={onLoadMore}>load more</Button>}
      </Container>
    </Box>
  )
}

export default FavoriteList
