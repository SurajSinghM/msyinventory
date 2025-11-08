import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    'inventory.overview': 'Inventory Overview',
    'forecast': 'Forecast',
    'reorder.suggestion': 'Reorder Suggestion',
    'shipment.tracker': 'Shipment Tracker',
    'cost.insights': 'Cost Insights',
    'alerts': 'Alerts',
    'settings': 'Settings',
    'upload.data': 'Upload Data',
    'sign.out': 'Sign Out',
  },
  zh: {
    'inventory.overview': '库存概览',
    'forecast': '预测',
    'reorder.suggestion': '补货建议',
    'shipment.tracker': '运输追踪',
    'cost.insights': '成本分析',
    'alerts': '警报',
    'settings': '设置',
    'upload.data': '上传数据',
    'sign.out': '登出',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en')
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

