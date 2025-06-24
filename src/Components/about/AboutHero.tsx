import React from 'react'
import ImageSlider from './ImageSlider'
import type { SliderImage } from '../../types/about'

interface AboutHeroProps {
  title: string
  tagline: string
  introduction: string
  sliderImages: SliderImage[]
  bgColor?: string
}

const AboutHero: React.FC<AboutHeroProps> = ({
  title, tagline, introduction, sliderImages, bgColor
}) => (
  <section className={bgColor ?? 'bg-white py-12'}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">{title}</h1>
          <h2 className="text-3xl font-semibold text-indigo-600">{tagline}</h2>
          <p className="text-lg text-gray-600">{introduction}</p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Explore Our Story
          </button>
        </div>
        <div className="w-full mt-6 md:mt-0">
          <ImageSlider images={sliderImages} />
        </div>
      </div>
    </div>
  </section>
)

export default AboutHero
