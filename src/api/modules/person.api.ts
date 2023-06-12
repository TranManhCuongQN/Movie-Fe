import publicClient from '../client/public.client'

const personEndpoints = {
  detail: (personId: string) => `person/${personId}`,
  medias: (personId: string) => `person/${personId}/medias`
}

const personApi = {
  detail: async (personId: string) => {
    const response = await publicClient.get(personEndpoints.detail(personId))
    return response.data
  },
  medias: async (personId: string) => {
    const response = await publicClient.get(personEndpoints.medias(personId))
    return response.data
  }
}

export default personApi
