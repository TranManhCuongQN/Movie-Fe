export interface movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: false
  vote_average: number
  vote_count: number
  name: string
  mediaTitle: string
  mediaPoster: string
  profile_path: string
  first_air_date: string
  mediaRate: number
  credits: {
    cast: {
      id: string
      name: string
      profile_path: string
    }[]
  }
}
