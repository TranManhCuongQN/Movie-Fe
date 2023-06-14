import { User } from './user.type'

export interface Favorite {
  user?: User
  mediaType: string
  mediaId: string
  mediaTitle: string
  mediaPoster: string
  mediaRate: number
  id?: string
}
