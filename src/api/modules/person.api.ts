import axiosClient from '../axios.client'

const personEndpoints = {
  detail: (personId: string) => `person/${personId}`,
  medias: (personId: string) => `person/${personId}/medias`
}

const personApi = {
  detail: async (personId: string) => {
    const response = await axiosClient.get(personEndpoints.detail(personId))
    return response
  },
  medias: async (personId: string) => {
    const response = await axiosClient.get(personEndpoints.medias(personId))
    return response
  }
}

export default personApi
