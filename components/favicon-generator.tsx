"use client"

import { useEffect } from "react"

export function FaviconGenerator() {
  useEffect(() => {
    // Create favicon dynamically
    const canvas = document.createElement("canvas")
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 32, 32)
      gradient.addColorStop(0, "#3B82F6")
      gradient.addColorStop(0.5, "#1D4ED8")
      gradient.addColorStop(1, "#1E40AF")

      // Draw circle background
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(16, 16, 15, 0, 2 * Math.PI)
      ctx.fill()

      // Draw airplane
      ctx.fillStyle = "#FFFFFF"
      ctx.beginPath()
      // Simple airplane shape
      ctx.moveTo(16, 6)
      ctx.lineTo(22, 12)
      ctx.lineTo(19, 12)
      ctx.lineTo(16, 17)
      ctx.lineTo(13, 12)
      ctx.lineTo(10, 12)
      ctx.closePath()
      ctx.fill()

      // Add small wings
      ctx.beginPath()
      ctx.moveTo(11, 10)
      ctx.lineTo(9, 8)
      ctx.lineTo(10, 7)
      ctx.lineTo(12, 9)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(21, 10)
      ctx.lineTo(23, 8)
      ctx.lineTo(22, 7)
      ctx.lineTo(20, 9)
      ctx.closePath()
      ctx.fill()

      // Convert to favicon
      const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement("link")
      link.type = "image/x-icon"
      link.rel = "shortcut icon"
      link.href = canvas.toDataURL("image/x-icon")
      document.getElementsByTagName("head")[0].appendChild(link)
    }
  }, [])

  return null
}
