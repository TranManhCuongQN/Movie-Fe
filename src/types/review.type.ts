import { User } from './user.type'

export interface Review {
  user: User
  content: string
  mediaType: 'movie' | 'tv'
  mediaId: string
  mediaTitle: string
  mediaPoster: string
}
