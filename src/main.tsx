import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import BlogComingSoon from './BlogComingSoon'

const showBlogComingSoon = (): boolean => {
  const { hostname, search } = window.location

  if (import.meta.env.DEV && hostname === 'localhost') {
    return new URLSearchParams(search).get('preview') === 'blog'
  }

  return hostname.startsWith('blog.')
}

const Root = () => (showBlogComingSoon() ? <BlogComingSoon /> : <App />)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
