const mediaType = {
  movie: 'movie',
  tv: 'tv'
}

const mediaCategory = {
  popular: 'popular',
  top_rated: 'top_rated'
}

const backdropPath = (imgEndpoint: string) => `https://image.tmdb.org/t/p/original${imgEndpoint}`

const posterPath = (imgEndpoint: string) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`

const youtubePath = (videoId: string) => `https://www.youtube.com/embed/${videoId}`

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath
}

export default tmdbConfigs
