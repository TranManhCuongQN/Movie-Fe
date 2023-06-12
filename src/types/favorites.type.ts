import { User } from './user.type'

export interface Favorite {
  user: User
  mediaType: 'movie' | 'tv'
  mediaId: string
  mediaTitle: string
  mediaPoster: string
  mediaRate: number
}
