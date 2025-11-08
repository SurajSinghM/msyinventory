import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface FlameLogoProps {
  size?: number
}

export default function FlameLogo({ size = 80 }: FlameLogoProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, #FFC72C 0%, #E10600 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Outer flame - gold */}
          <motion.path
            d="M50 20 C45 15, 35 20, 35 30 C35 25, 40 30, 45 35 C40 40, 35 50, 40 60 C45 70, 50 80, 50 80 C50 80, 55 70, 60 60 C65 50, 60 40, 55 35 C60 30, 65 25, 65 30 C65 20, 55 15, 50 20 Z"
            fill="#FFC72C"
            animate={{
              d: [
                'M50 20 C45 15, 35 20, 35 30 C35 25, 40 30, 45 35 C40 40, 35 50, 40 60 C45 70, 50 80, 50 80 C50 80, 55 70, 60 60 C65 50, 60 40, 55 35 C60 30, 65 25, 65 30 C65 20, 55 15, 50 20 Z',
                'M50 20 C48 18, 36 22, 36 30 C36 26, 41 31, 46 36 C41 41, 36 51, 41 61 C46 71, 50 80, 50 80 C50 80, 54 71, 59 61 C64 51, 59 41, 54 36 C59 31, 64 26, 64 30 C64 22, 52 18, 50 20 Z',
                'M50 20 C45 15, 35 20, 35 30 C35 25, 40 30, 45 35 C40 40, 35 50, 40 60 C45 70, 50 80, 50 80 C50 80, 55 70, 60 60 C65 50, 60 40, 55 35 C60 30, 65 25, 65 30 C65 20, 55 15, 50 20 Z',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            opacity={0.95}
          />
          
          {/* Middle flame - orange */}
          <motion.path
            d="M50 25 C47 22, 38 25, 38 32 C38 28, 42 32, 46 36 C42 40, 38 48, 41 55 C44 62, 50 72, 50 72 C50 72, 56 62, 59 55 C62 48, 58 40, 54 36 C58 32, 62 28, 62 32 C62 25, 53 22, 50 25 Z"
            fill="#FF6B35"
            animate={{
              opacity: [0.7, 0.95, 0.7],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Inner flame - red */}
          <motion.path
            d="M50 30 C47 28, 40 32, 40 38 C40 35, 43 38, 46 40 C43 43, 40 50, 43 55 C46 60, 50 70, 50 70 C50 70, 54 60, 57 55 C60 50, 57 43, 54 40 C57 38, 60 35, 60 38 C60 32, 53 28, 50 30 Z"
            fill="#E10600"
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Core - bright gold */}
          <motion.circle
            cx="50"
            cy="45"
            r="8"
            fill="#FFD700"
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>
    </div>
  )
}

