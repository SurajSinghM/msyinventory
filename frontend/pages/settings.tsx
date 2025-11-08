import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import { useLanguage } from '@/components/LanguageProvider'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Settings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language } = useLanguage()
  const [training, setTraining] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const handleTrainModel = async () => {
    try {
      setTraining(true)
      const response = await axios.post(`${API_URL}/train`)
      toast.success(
        language === 'en'
          ? 'Model training completed!'
          : '模型训练完成！'
      )
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ||
          (language === 'en' ? 'Error training model' : '训练模型时出错')
      )
    } finally {
      setTraining(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-primary-rice dark:bg-primary-navy flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Head>
        <title>
          {language === 'en' ? 'Settings' : '设置'} - Mai Shan Yun
        </title>
      </Head>
      <div className="min-h-screen bg-primary-rice dark:bg-primary-navy">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-navy dark:text-primary-rice mb-8">
              {language === 'en' ? 'Settings' : '设置'}
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">
                  {language === 'en' ? 'Account Settings' : '账户设置'}
                </h2>
                {session.user && (
                  <div className="space-y-2">
                    <p>
                      <strong>{language === 'en' ? 'Name:' : '姓名：'}</strong>{' '}
                      {session.user.name}
                    </p>
                    <p>
                      <strong>{language === 'en' ? 'Email:' : '电子邮件：'}</strong>{' '}
                      {session.user.email}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-bold mb-4">
                  {language === 'en' ? 'Model Training' : '模型训练'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'en'
                    ? 'Retrain the forecasting model with latest data'
                    : '使用最新数据重新训练预测模型'}
                </p>
                <button
                  onClick={handleTrainModel}
                  disabled={training}
                  className="px-4 py-2 bg-primary-jade text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {training
                    ? language === 'en'
                      ? 'Training...'
                      : '训练中...'
                    : language === 'en'
                    ? 'Retrain Model'
                    : '重新训练模型'}
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-bold mb-4">
                  {language === 'en' ? 'Preferences' : '偏好设置'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en'
                    ? 'Theme and language preferences are saved automatically.'
                    : '主题和语言偏好设置会自动保存。'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

