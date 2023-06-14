import ProtectedPage from 'src/components/common/ProtectedPage'
import FavoriteList from 'src/pages/FavoriteList'
import HomePage from 'src/pages/HomePage'
import MediaDetail from 'src/pages/MediaDetail'
import MediaList from 'src/pages/MediaList'
import MediaSearch from 'src/pages/MediaSearch'
import PasswordUpdate from 'src/pages/PasswordUpdate'
import PersonDetail from 'src/pages/PersonDetail'
import ReviewList from 'src/pages/ReviewList'

export const routesURL = {
  home: '/',
  mediaList: (type: string) => `/${type}`,
  mediaDetail: (type: string, id: number) => `${type}/${id}`,
  mediaSearch: '/search',
  person: (id: string) => `/person/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: '/password-update'
}

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home'
  },
  {
    path: '/person/:personId',
    element: <PersonDetail />,
    state: 'person.detail'
  },
  {
    path: '/search',
    element: <MediaSearch />,
    state: 'search'
  },
  {
    path: '/password-update',
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: 'password.update'
  },
  {
    path: '/favorites',
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: 'favorites'
  },
  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews'
  },
  {
    path: '/:mediaType',
    element: <MediaList />
  },
  {
    path: '/:mediaType/:mediaId',
    element: <MediaDetail />
  }
]
export default routes
