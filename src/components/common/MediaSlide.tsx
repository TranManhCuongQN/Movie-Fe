import { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import mediaApi from '../../api/modules/media.api'

import { toast } from 'react-toastify'
import MediaItem from './MediaItem'
import AutoSwiper from './AutoSwiper'
import { useQuery } from 'react-query'
import { movie } from 'src/types/movie.type'

const MediaSlide = ({ mediaType, mediaCategory }: { mediaType: string; mediaCategory: string }) => {
  const [medias, setMedias] = useState<movie[]>([])

  const { data: dataMediasHome } = useQuery({
    queryKey: ['getMedias', { mediaType, mediaCategory }],
    queryFn: () => mediaApi.list({ mediaType, mediaCategory, page: 1 }),
    onSuccess: (res) => {
      setMedias(res.data.results)
    },
    onError: (err: any) => {
      toast.dismiss()
      toast.error(err.message)
    }
  })

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default MediaSlide
