import { Review } from 'src/types/review.type'
import privateClient from '../client/axios.client'

const reviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: (reviewId: string) => `reviews/${reviewId}`
}

const reviewApi = {
  add: async ({ mediaId, mediaType, content, mediaPoster, mediaTitle }: Review) => {
    const response = await privateClient.post(reviewEndpoints.add, {
      mediaId,
      mediaType,
      content,
      mediaPoster,
      mediaTitle
    })
    return response.data
  },
  list: async () => {
    const response = await privateClient.get(reviewEndpoints.list)
    return response.data
  },
  remove: async (reviewId: string) => {
    const response = await privateClient.delete(reviewEndpoints.remove(reviewId))
    return response.data
  }
}
export default reviewApi
