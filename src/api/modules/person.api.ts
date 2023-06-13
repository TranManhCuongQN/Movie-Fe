import axiosClient from '../axios.client'

const personEndpoints = {
  detail: (personId: string) => `person/${personId}`,
  medias: (personId: string) => `person/${personId}/medias`
}

const personApi = {
  detail: async (personId: string) => {
    const response = await axiosClient.get(personEndpoints.detail(personId))
    return response.data
  },
  medias: async (personId: string) => {
    const response = await axiosClient.get(personEndpoints.medias(personId))
    return response.data
  }
}

export default personApi
