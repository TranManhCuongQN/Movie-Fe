import { create } from 'zustand'

interface ThemeMode {
  themeMode: string
  setThemeMode: (themMode: string) => void
}

const useThemeModeStore = create<ThemeMode>()((set) => ({
  themeMode: 'dark',
  setThemeMode: (themeMode: string) => set({ themeMode })
}))

export default useThemeModeStore
