import { User } from './user.type'

export interface Favorite {
  user?: User
  mediaType: string
  mediaId: string
  mediaTitle: string
  mediaPoster: string
  mediaRate: number
  id?: string
  title?: string
  name?: string
  poster_path?: string
  backdrop_path?: string
  profile_path?: string
  release_date?: string
  first_air_date?: string
  vote_average?: number
}
