import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import FlameLogo from './FlameLogo'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <FlameLogo size={40} />
            <div>
              <h1 className="text-xl font-bold text-primary-navy dark:text-primary-rice">
                {language === 'en' ? 'Mai Shan Yun' : '麦·山·云'}
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Inventory Intelligence' : '库存智能'}
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {t('inventory.overview')}
            </Link>
            <Link
              href="/data"
              className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {t('upload.data')}
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {t('settings')}
            </Link>

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded bg-primary-gold text-primary-navy hover:bg-opacity-80 transition text-sm"
              >
                {language === 'en' ? '中文' : 'English'}
              </button>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded bg-primary-jade text-white hover:bg-opacity-80 transition"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              
              {session && (
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-1 rounded bg-primary-red text-white hover:bg-opacity-80 transition text-sm"
                  >
                    {t('sign.out')}
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

