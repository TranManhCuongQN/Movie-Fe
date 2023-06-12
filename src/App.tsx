import { CssBaseline, ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import themeConfigs from './configs/theme.config'
import useThemeModeStore from './zustand/themeMode'

function App() {
  const themeMode = useThemeModeStore((state) => state.themeMode)

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position='bottom-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        theme={themeMode}
      />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
