import React from 'react'
import { applyTheme, Theme } from '../theme'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system')

  React.useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 p-1">
      {(['light','dark','system'] as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1.5 rounded-lg text-sm transition
            ${theme === t ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
          aria-pressed={theme === t}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle