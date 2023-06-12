import { create } from 'zustand'

interface ThemeMode {
  themeMode: 'dark' | 'light'
  setThemeMode: (themMode: 'dark' | 'light') => void
}

const useThemeModeStore = create<ThemeMode>()((set) => ({
  themeMode: 'light',
  setThemeMode: (themeMode: 'dark' | 'light') => set({ themeMode })
}))

export default useThemeModeStore
