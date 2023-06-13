import { Review } from 'src/types/review.type'
import axiosClient from '../axios.client'

const reviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: (reviewId: string) => `reviews/${reviewId}`
}

const reviewApi = {
  add: async ({ mediaId, mediaType, content, mediaPoster, mediaTitle }: Review) => {
    const response = await axiosClient.post(reviewEndpoints.add, {
      mediaId,
      mediaType,
      content,
      mediaPoster,
      mediaTitle
    })
    return response.data
  },
  list: async () => {
    const response = await axiosClient.get(reviewEndpoints.list)
    return response.data
  },
  remove: async (reviewId: string) => {
    const response = await axiosClient.delete(reviewEndpoints.remove(reviewId))
    return response.data
  }
}
export default reviewApi
