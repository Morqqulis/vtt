'use client'

import { useEffect, useRef } from 'react'

interface FormatCanvasProps {
  position: { x: number; y: number }
  onPositionChange: (position: { x: number; y: number }) => void
  width?: number
  height?: number
}

export default function FormatCanvas({ 
  position, 
  onPositionChange, 
  width = 800, 
  height = 600 
}: FormatCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background grid or axes here if needed
    
    // Draw position marker
    ctx.beginPath()
    ctx.arc(position.x, position.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = '#ef4444' // red-500
    ctx.fill()

    // Draw label
    ctx.font = '14px sans-serif'
    ctx.fillStyle = 'white'
    ctx.fillText('Format Position', position.x - 40, position.y + 30)
  }, [position, width, height])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = Math.max(0, Math.min(width, e.clientX - rect.left))
    const y = Math.max(0, Math.min(height, e.clientY - rect.top))
    
    onPositionChange({ x, y })
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="cursor-move"
    />
  )
} 