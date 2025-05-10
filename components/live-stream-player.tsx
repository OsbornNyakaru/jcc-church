"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Maximize, Settings } from "lucide-react"
import Hls from "hls.js"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LiveStreamPlayerProps {
  streamId: string
}

export function LiveStreamPlayer({ streamId }: LiveStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentQuality, setCurrentQuality] = useState("auto")
  const containerRef = useRef<HTMLDivElement>(null)

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
    video
      .play()
      .then(() => {
        setIsPlaying(true)
        // Unmute after autoplay starts if the user has previously set volume
        if (localStorage.getItem("livestream-volume")) {
          const savedVolume = Number.parseFloat(localStorage.getItem("livestream-volume") || "1")
          setVolume(savedVolume)
          video.volume = savedVolume
          video.muted = savedVolume === 0
          setIsMuted(savedVolume === 0)
        }
      })
      .catch((error) => {
        console.error("Error attempting to play", error)
      })

    // Event listeners
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleVolumeChange = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
      localStorage.setItem("livestream-volume", video.volume.toString())
    }
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("volumechange", handleVolumeChange)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("volumechange", handleVolumeChange)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [streamId])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((error) => {
        console.error("Error attempting to play", error)
      })
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
    if (video.muted) {
      // Save current volume before muting
      localStorage.setItem("livestream-volume-before-mute", video.volume.toString())
      setVolume(0)
    } else {
      // Restore volume from before muting
      const volumeBeforeMute = Number.parseFloat(localStorage.getItem("livestream-volume-before-mute") || "1")
      video.volume = volumeBeforeMute
      setVolume(volumeBeforeMute)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    video.muted = newVolume === 0
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    localStorage.setItem("livestream-volume", newVolume.toString())
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const setQuality = (quality: string) => {
    const video = videoRef.current
    if (!video) return

    // In a real implementation, you would use the HLS.js API to change quality levels
    setCurrentQuality(quality)
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-lg bg-black">
      <video ref={videoRef} className="aspect-video w-full" playsInline controls={false} />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            </Button>

            <div className="w-24">
              <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} className="h-1" />
            </div>

            <div className="ml-4 text-sm text-white">LIVE</div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quality</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setQuality("auto")}
                  className={currentQuality === "auto" ? "bg-accent" : ""}
                >
                  Auto
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setQuality("1080p")}
                  className={currentQuality === "1080p" ? "bg-accent" : ""}
                >
                  1080p
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setQuality("720p")}
                  className={currentQuality === "720p" ? "bg-accent" : ""}
                >
                  720p
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setQuality("480p")}
                  className={currentQuality === "480p" ? "bg-accent" : ""}
                >
                  480p
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setQuality("360p")}
                  className={currentQuality === "360p" ? "bg-accent" : ""}
                >
                  360p
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
              <span className="sr-only">Fullscreen</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
