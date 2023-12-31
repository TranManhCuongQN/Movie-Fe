import axiosClient from '../axios.client'

const mediaEndPoints = {
  list: ({ mediaType, mediaCategory, page }: { mediaType: string; mediaCategory: string; page: number }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }: { mediaType?: string; mediaId?: string }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }: { mediaType: string; query: string; page: number }) =>
    `${mediaType}/search/?query=${query}&page=${page}`
}

const mediaApi = {
  detail: async ({ mediaType, mediaId }: { mediaType?: string; mediaId?: string }) => {
    const response = await axiosClient.get(mediaEndPoints.detail({ mediaType, mediaId }))
    return response
  },
  list: async ({ mediaType, mediaCategory, page }: { mediaType: string; mediaCategory: string; page: number }) => {
    const response = await axiosClient.get(mediaEndPoints.list({ mediaType, mediaCategory, page }))
    return response
  },
  search: async ({ mediaType, query, page }: { mediaType: string; query: string; page: number }) => {
    const response = await axiosClient.get(mediaEndPoints.search({ mediaType, query, page }))
    return response
  }
}

export default mediaApi
