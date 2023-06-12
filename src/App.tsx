import { CssBaseline, ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import themeConfigs from './configs/theme.config'

function App() {
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: 'light' })}>
      <ToastContainer
        position='bottom-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        theme='light'
      />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
