import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import NavigationSwiper from './NavigationSwiper'

const MediaVideo = ({ video }: { video: { id: string; key: string } }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const height = ((iframeRef.current as HTMLIFrameElement).offsetWidth * 9) / 16 + 'px'

    if (iframeRef.current) {
      iframeRef.current.setAttribute('height', height)
    }
  }, [video])

  return (
    <Box sx={{ height: 'max-content' }}>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width='100%'
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  )
}

const MediaVideosSlide = ({ videos }: { videos: { id: string; key: string }[] }) => {
  return (
    <NavigationSwiper>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  )
}

export default MediaVideosSlide
