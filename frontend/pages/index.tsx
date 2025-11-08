import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import { useTheme } from '@/components/ThemeProvider'
import { useLanguage } from '@/components/LanguageProvider'
import FlameLogo from '@/components/FlameLogo'
import Dragon from '@/components/Dragon'
import FloatingFlames from '@/components/FloatingFlames'

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
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-red-50 to-yellow-50 dark:from-gray-900 dark:via-red-950 dark:to-amber-950">
        {/* Decorative Chinese patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary-gold rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-primary-red rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-primary-gold transform rotate-45"></div>
        </div>

        {/* Floating flames background */}
        <FloatingFlames />

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header with theme and language toggles */}
          <div className="flex justify-end gap-4 mb-8">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-gold to-yellow-400 text-primary-navy hover:from-yellow-400 hover:to-primary-gold transition shadow-md font-semibold border-2 border-primary-red"
            >
              {language === 'en' ? '中文' : 'English'}
            </button>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-red to-red-600 text-white hover:from-red-600 hover:to-primary-red transition shadow-md font-semibold"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Dragons on sides */}
          <div className="absolute left-0 top-1/4 transform -translate-y-1/2 hidden lg:block">
            <Dragon size={180} />
          </div>
          <div className="absolute right-0 top-1/4 transform -translate-y-1/2 scale-x-[-1] hidden lg:block">
            <Dragon size={180} />
          </div>

          {/* Main content */}
          <div className="max-w-4xl mx-auto text-center mt-20 relative z-10">
            <div className="mb-8">
              <FlameLogo size={140} />
            </div>
            
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary-red via-red-600 to-primary-gold bg-clip-text text-transparent drop-shadow-lg">
              {t.title}
            </h1>
            
            <p className="text-3xl mb-8 text-primary-gold font-bold drop-shadow-md">
              {t.subtitle}
            </p>
            
            <p className="text-xl mb-12 text-gray-800 dark:text-gray-200 font-medium">
              {t.tagline}
            </p>

            {status === 'loading' ? (
              <div className="text-lg text-primary-red font-semibold">Loading...</div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-10 py-5 text-lg bg-gradient-to-r from-primary-red to-red-600 text-white rounded-xl hover:from-red-600 hover:to-primary-red transition-all shadow-2xl font-bold border-4 border-primary-gold hover:scale-105 flex items-center gap-3 mx-auto group"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>{t.signIn}</span>
              </button>
            )}
          </div>

          {/* Feature highlights */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
            <div className="p-8 bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-red-900 rounded-xl shadow-xl border-4 border-primary-gold hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-primary-red dark:text-primary-gold">
                {language === 'en' ? 'Inventory Overview' : '库存概览'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'en' 
                  ? 'Track ingredient levels and get low-stock alerts' 
                  : '跟踪配料水平并获取低库存警报'}
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900 rounded-xl shadow-xl border-4 border-primary-red hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-2xl font-bold mb-3 text-primary-red dark:text-primary-gold">
                {language === 'en' ? 'Forecast' : '预测'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'en' 
                  ? 'Predict future ingredient needs with AI-powered forecasting' 
                  : '使用AI驱动的预测预测未来配料需求'}
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-red-900 rounded-xl shadow-xl border-4 border-primary-gold hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-primary-red dark:text-primary-gold">
                {language === 'en' ? 'Cost Optimization' : '成本优化'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
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

