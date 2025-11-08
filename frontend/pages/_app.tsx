import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <LanguageProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

