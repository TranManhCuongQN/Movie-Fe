import { Review } from './review.type'

export interface movie {
  backdrop_path: string
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
  name: string
  mediaTitle: string
  mediaPoster: string
  profile_path: string
  first_air_date: string
  mediaRate: number
  images: {
    backdrops: {
      file_path: string
    }[]
    posters: {
      file_path: string
    }[]
  }
  credits: {
    cast: {
      id: string
      name: string
      profile_path: string
    }[]
  }
  videos: {
    results: {
      key: string
      id: string
    }[]
  }
  reviews: Review[]
  recommend: movie[]
  genre_ids: number[]
}
