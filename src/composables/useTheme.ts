import { computed, onMounted, ref } from 'vue'

type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'ammo-site-theme'
const theme = ref<ThemeMode>('light')
let initialized = false

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null
  } catch {
    return null
  }
}

function applyTheme(nextTheme: ThemeMode) {
  theme.value = nextTheme

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = nextTheme
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // Keep theme switching usable even when storage is blocked.
    }
  }
}

function initializeTheme() {
  if (initialized || typeof window === 'undefined') {
    return
  }

  applyTheme(getStoredTheme() || 'light')
  initialized = true
}

export function useTheme() {
  onMounted(() => {
    initializeTheme()
  })

  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    isDark,
    toggleTheme,
  }
}
