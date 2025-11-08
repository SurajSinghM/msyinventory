import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import { useTheme } from '@/components/ThemeProvider'
import { useLanguage } from '@/components/LanguageProvider'
import FlameLogo from '@/components/FlameLogo'

export default function Landing() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  const translations = {
    en: {
      title: 'Mai Shan Yun',
      subtitle: 'Wheat · Mountain · Cloud',
      description: 'Inventory Intelligence Dashboard',
      signIn: 'Sign in with Google',
      tagline: 'Transform raw restaurant data into actionable intelligence'
    },
    zh: {
      title: '麦·山·云',
      subtitle: '小麦 · 山 · 云',
      description: '库存智能仪表板',
      signIn: '使用 Google 登录',
      tagline: '将原始餐厅数据转化为可操作的智能'
    }
  }

  const t = translations[language]

  return (
    <>
      <Head>
        <title>{t.title} - {t.description}</title>
        <meta name="description" content={t.tagline} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-primary-rice via-white to-primary-rice dark:from-primary-navy dark:via-gray-900 dark:to-primary-navy">
        <div className="container mx-auto px-4 py-8">
          {/* Header with theme and language toggles */}
          <div className="flex justify-end gap-4 mb-8">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-primary-gold text-primary-navy hover:bg-opacity-80 transition"
            >
              {language === 'en' ? '中文' : 'English'}
            </button>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-primary-jade text-white hover:bg-opacity-80 transition"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Main content */}
          <div className="max-w-4xl mx-auto text-center mt-20">
            <div className="mb-8">
              <FlameLogo size={120} />
            </div>
            
            <h1 className="text-6xl font-bold mb-4 text-primary-navy dark:text-primary-rice">
              {t.title}
            </h1>
            
            <p className="text-2xl mb-8 text-primary-gold font-semibold">
              {t.subtitle}
            </p>
            
            <p className="text-xl mb-12 text-gray-700 dark:text-gray-300">
              {t.tagline}
            </p>

            {status === 'loading' ? (
              <div className="text-lg">Loading...</div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-8 py-4 text-lg bg-primary-red text-white rounded-lg hover:bg-opacity-90 transition shadow-lg font-semibold"
              >
                {t.signIn}
              </button>
            )}
          </div>

          {/* Feature highlights */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-primary-navy dark:text-primary-rice">
                {language === 'en' ? 'Inventory Overview' : '库存概览'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? 'Track ingredient levels and get low-stock alerts' 
                  : '跟踪配料水平并获取低库存警报'}
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-primary-navy dark:text-primary-rice">
                {language === 'en' ? 'Forecast' : '预测'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? 'Predict future ingredient needs with AI-powered forecasting' 
                  : '使用AI驱动的预测预测未来配料需求'}
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-primary-navy dark:text-primary-rice">
                {language === 'en' ? 'Cost Optimization' : '成本优化'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? 'Identify cost drivers and optimize spending' 
                  : '识别成本驱动因素并优化支出'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

