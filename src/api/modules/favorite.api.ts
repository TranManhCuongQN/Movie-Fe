import { Favorite } from 'src/types/favorites.type'
import axiosClient from '../client/axios.client'

const favoriteEndpoints = {
  list: 'user/favorites',
  add: 'user/favorites',
  remove: (favoriteId: string) => `user/favorites/${favoriteId}`
}

const favoriteApi = {
  add: async ({ mediaId, mediaPoster, mediaRate, mediaTitle, mediaType }: Favorite) => {
    const response = await axiosClient.post(favoriteEndpoints.add, {
      mediaId,
      mediaPoster,
      mediaRate,
      mediaTitle,
      mediaType
    })
    return response.data
  },
  getList: async () => {
    const response = await axiosClient.get(favoriteEndpoints.list)
    return response.data
  },
  remove: async (favoriteId: string) => {
    const response = await axiosClient.delete(favoriteEndpoints.remove(favoriteId))
    return response.data
  }
}

export default favoriteApi
