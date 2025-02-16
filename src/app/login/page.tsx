'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import { motion } from 'framer-motion'
import AdminLogo from '@/assets/adminlogo.svg'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password'),
        }),
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <HeroGeometric 
          badge=""
          title1=""
          title2=""
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="w-full max-w-sm p-6 bg-black/30 backdrop-blur-xl rounded-lg shadow-xl border border-white/20">
          <div className="mb-8 flex justify-center">
            <AdminLogo className="h-12 w-auto" />
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg 
                    text-white placeholder-white/60 focus:outline-none focus:ring-2 
                    focus:ring-white/20 focus:border-transparent"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg 
                    text-white placeholder-white/60 focus:outline-none focus:ring-2 
                    focus:ring-white/20 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-rose-300 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className={`w-full px-4 py-2 text-sm font-medium text-white 
                bg-black/30 border border-white/20 rounded-lg hover:bg-white/20 
                focus:outline-none focus:ring-2 focus:ring-white/20 
                transition-colors duration-200 ease-in-out`}
            >
              Sign in
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
} 