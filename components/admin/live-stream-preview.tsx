"use client"

import { useRef, useEffect } from "react"
import Hls from "hls.js"

interface LiveStreamPreviewProps {
  streamId: string
}

export function LiveStreamPreview({ streamId }: LiveStreamPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Check if HLS is supported natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = `https://stream.mux.com/${streamId}.m3u8`
    } else if (Hls.isSupported()) {
      // Use HLS.js for browsers that don't support HLS natively
      const hls = new Hls({
        autoStartLoad: true,
        startLevel: -1, // Auto quality selection
      })
      hls.loadSource(`https://stream.mux.com/${streamId}.m3u8`)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => {
          console.error("Error attempting to play", error)
        })
      })

      return () => {
        hls.destroy()
      }
    } else {
      console.error("HLS is not supported in this browser")
    }

    // Auto-play with muted audio (to comply with browser autoplay policies)
    video.muted = true
    video.play().catch((error) => {
      console.error("Error attempting to play", error)
    })
  }, [streamId])

  return (
    <div className="overflow-hidden rounded-lg bg-black">
      <video ref={videoRef} className="aspect-video w-full" playsInline controls muted />
    </div>
  )
}
