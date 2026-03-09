import { useEffect } from 'react'

const BASE_TITLE = 'Qmillion — Producer. Mixer. Sonic Architect.'
const BASE_URL = 'https://qmillion.netlify.app'

const usePageMeta = ({
  title,
  description,
  path = '',
}: {
  title?: string
  description: string
  path?: string
}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — Qmillion` : BASE_TITLE

    document.title = fullTitle

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', fullTitle)
    set('meta[property="og:description"]', 'content', description)
    set('meta[name="twitter:title"]', 'content', fullTitle)
    set('meta[name="twitter:description"]', 'content', description)

    if (path) {
      const url = `${BASE_URL}${path}`
      set('meta[property="og:url"]', 'content', url)
      set('link[rel="canonical"]', 'href', url)
    }
  }, [title, description, path])
}

export default usePageMeta
