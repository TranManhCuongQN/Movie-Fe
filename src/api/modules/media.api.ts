import axiosClient from '../axios.client'

const mediaEndPoints = {
  list: ({ meidaType, mediaCategory, page }: { meidaType: string; mediaCategory: string; page: number }) =>
    `${meidaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }: { mediaType: string; mediaId: string }) => `${mediaType}/${mediaId}`,
  search: ({ mediaType, query, page }: { mediaType: string; query: string; page: number }) =>
    `${mediaType}/search/?query=${query}&page=${page}`
}

const mediaApi = {
  detail: async ({ mediaType, mediaId }: { mediaType: string; mediaId: string }) => {
    const response = await axiosClient.get(mediaEndPoints.detail({ mediaType, mediaId }))
    return response
  },
  list: async ({ meidaType, mediaCategory, page }: { meidaType: string; mediaCategory: string; page: number }) => {
    const response = await axiosClient.get(mediaEndPoints.list({ meidaType, mediaCategory, page }))
    return response
  },
  search: async ({ mediaType, query, page }: { mediaType: string; query: string; page: number }) => {
    const response = await axiosClient.get(mediaEndPoints.search({ mediaType, query, page }))
    return response
  }
}

export default mediaApi
