import { useState, useEffect } from 'react'
import type { SliderImage } from '../types/about'

interface HeroData {
  title: string
  tagline: string
  introduction: string
  sliderImages: SliderImage[]  // each will have a full URL in `src`
}

interface UseAboutHeroReturn {
  heroData: HeroData | null
  metricsData: any | null
  loading: boolean
  error: string | null
}

export function useAboutHero(): UseAboutHeroReturn {
  const [heroData,   setHeroData]   = useState<HeroData | null>(null)
  const [metricsData, setMetricsData] = useState<any | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState<string | null>(null)

  useEffect(() => {
    async function fetchAbout() {
      try {
        const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
        const res  = await fetch(`${base}/api/about-hero`)
        if (!res.ok) throw new Error(res.statusText)
        const json = await res.json()

        // rewrite sliderImages -> absolute URLs
        const imgs: SliderImage[] = json.AboutHero.sliderImages.map((img: any) => ({
          ...img,
          src: img.src.startsWith('http')
            ? img.src
            : `${base}/${img.src}`
        }))

        setHeroData({
          title:        json.AboutHero.title,
          tagline:      json.AboutHero.tagline,
          introduction: json.AboutHero.introduction,
          sliderImages: imgs
        })
        setMetricsData(json.metrics)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  return { heroData, metricsData, loading, error }
}
