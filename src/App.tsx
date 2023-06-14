/* eslint-disable import/no-unresolved */
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PageWrapper from './components/common/PageWrapper'
import MainLayout from './components/layout/MainLayout'
import themeConfigs from './configs/theme.config'
import routes from './routes/routes'
import useThemeModeStore from './zustand/themeMode'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function App() {
  const themeMode = useThemeModeStore((state) => state.themeMode)

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode as PaletteMode })}>
      {/* config toastify */}
      <ToastContainer
        position='bottom-left'
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        theme={themeMode as PaletteMode}
      />

      {/* mui reset css */}
      <CssBaseline />

      {/* app routes */}
      <Routes>
        <Route path='/' element={<MainLayout />}>
          {routes.map((route, index) =>
            route.index ? (
              <Route
                index
                key={index}
                element={route.state ? <PageWrapper state={route.state}>{route.element}</PageWrapper> : route.element}
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={route.state ? <PageWrapper state={route.state}>{route.element}</PageWrapper> : route.element}
              />
            )
          )}
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
