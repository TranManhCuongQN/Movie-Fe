export const routesURL = {
  home: '/',
  mediaList: (type: string) => `/${type}`,
  mediaDetail: (type: string, id: string) => `${type}/${id}`,
  mediaSearch: '/search',
  person: (id: string) => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: '/password-update'
}

const routes = []
