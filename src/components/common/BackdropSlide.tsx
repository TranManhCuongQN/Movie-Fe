import { Box } from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import NavigationSwiper from './NavigationSwiper'

const BackdropSlide = ({
  backdrops
}: {
  backdrops: {
    file_path: string
  }[]
}) => {
  return (
    <NavigationSwiper>
      {[...backdrops].map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: '60%',
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  )
}

export default BackdropSlide
