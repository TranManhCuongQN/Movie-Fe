import { User } from './user.type'

export interface Review {
  user?: User
  id?: string
  content: string
  mediaType: string
  mediaId: string
  mediaTitle: string
  mediaPoster: string
  createdAt?: string
}
