import { ComponentType } from "react"

export type PropertyType = {
  id: number
  title: string
  tagline: string
  description: string
  amenities: number[]
  address: string
  images: string[]
  price: number,
  rating: number
}

export type AmenitiesType = {
  id: number
  title: string,
  Icon?: ComponentType
}