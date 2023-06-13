import { Favorite } from 'src/types/favorites.type'
import axiosClient from '../axios.client'

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
    return response
  },
  getList: async () => {
    const response = await axiosClient.get(favoriteEndpoints.list)
    return response
  },
  remove: async (favoriteId: string) => {
    const response = await axiosClient.delete(favoriteEndpoints.remove(favoriteId))
    return response
  }
}

export default favoriteApi
