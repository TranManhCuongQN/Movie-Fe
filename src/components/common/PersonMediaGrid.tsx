import { Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import personApi from '../../api/modules/person.api'
import MediaItem from './MediaItem'
import { toast } from 'react-toastify'
import { movie } from 'src/types/movie.type'
import { useQuery } from 'react-query'

const PersonMediaGrid = ({ personId }: { personId: string }) => {
  const [medias, setMedias] = useState<movie[]>([])
  const [filteredMedias, setFilteredMedias] = useState<movie[]>([])
  const [page, setPage] = useState<number>(1)
  const skip = 8

  const getReleaseDate = (media: movie) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie ? new Date(media.release_date) : new Date(media.first_air_date)
    return date.getTime()
  }

  const person = useQuery({
    queryKey: ['person', { personId }],
    queryFn: () => personApi.medias(personId),
    onSuccess: (res) => {
      const mediasSorted = res.data.cast.sort((a: movie, b: movie) => getReleaseDate(b) - getReleaseDate(a))
      setMedias([...mediasSorted])
      setFilteredMedias([...mediasSorted].splice(0, skip))
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)])
    setPage(page + 1)
  }
  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && <Button onClick={onLoadMore}>load more</Button>}
    </>
  )
}

export default PersonMediaGrid
