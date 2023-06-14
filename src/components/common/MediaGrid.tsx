import { Grid } from '@mui/material'
import { movie } from 'src/types/movie.type'
import MediaItem from './MediaItem'

const MediaGrid = ({ medias, mediaType }: { medias: movie[]; mediaType: string }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
      {medias.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MediaGrid
