import axiosClient from '../client/axios.client'

const genreEndpoints = {
  list: (mediaType: string) => `${mediaType}/genres`
}

const genreApi = {
  getList: async (mediaType: string) => {
    const response = await axiosClient.get(genreEndpoints.list(mediaType))
    return response.data
  }
}

export default genreApi
