import { Box } from '@mui/system'
import { useQuery } from 'react-query'
import { Outlet } from 'react-router-dom'
import useAuthStore from 'src/zustand/auth'
import AuthModal from '../common/AuthModal'
import Footer from '../common/Footer'
import GlobalLoading from '../common/GlobalLoading'
import TopBar from '../common/TopBar'
import favoriteApi from 'src/api/modules/favorite.api'

const MainLayout = () => {
  const setFavorite = useAuthStore((state) => state.setListFavorites)
  const user = useAuthStore((state) => state.user)

  const { data } = useQuery({
    queryKey: ['favorite'],
    queryFn: () => favoriteApi.getList(),
    onSuccess: (res) => {
      console.log(res.data)
      setFavorite(res.data)
    },
    enabled: Boolean(user?.id) && Boolean(user?.token)
  })

  return (
    <>
      {/* GlobalLoading */}
      <GlobalLoading />

      {/* login modal */}
      <AuthModal />

      <Box display='flex' minHeight='100vh'>
        {/* header */}
        <TopBar />

        <Box component='main' flexGrow='1' overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default MainLayout
