import '@/styles/globals.css'
import Empty from '@/components/layout/Empty'
import { useRef, useState, useEffect } from 'react'
import Router from 'next/router'

export const usePageLoad = (delay = 2000) => {
  const timeoutRef = useRef()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
      timeoutRef.current = setTimeout(() => {
        setLoading(false)
      }, delay)
    }
    const end = () => {
      clearTimeout(timeoutRef.current)
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [delay])

  return loading
}


export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || Empty
  const loading = usePageLoad()
  return <Layout>
    {loading ? 'Loading...' : <Component {...pageProps} />}
  </Layout>
}
