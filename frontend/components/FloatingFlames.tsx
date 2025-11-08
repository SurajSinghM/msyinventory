import { motion } from 'framer-motion'

interface FloatingFlameProps {
  left: string
  delay: number
  size: number
}

function FloatingFlame({ left, delay, size }: FloatingFlameProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left, width: size, height: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [-20, -60, -100],
        opacity: [0, 0.8, 0],
        scale: [0.8, 1, 0.6],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M20 10 C18 8, 14 10, 14 15 C14 12, 16 15, 18 17 C16 19, 14 25, 16 30 C18 35, 20 40, 20 40 C20 40, 22 35, 24 30 C26 25, 24 19, 22 17 C24 15, 26 12, 26 15 C26 10, 22 8, 20 10 Z"
          fill="#FFC72C"
          animate={{
            d: [
              "M20 10 C18 8, 14 10, 14 15 C14 12, 16 15, 18 17 C16 19, 14 25, 16 30 C18 35, 20 40, 20 40 C20 40, 22 35, 24 30 C26 25, 24 19, 22 17 C24 15, 26 12, 26 15 C26 10, 22 8, 20 10 Z",
              "M20 10 C19 9, 15 11, 15 15 C15 13, 17 16, 19 18 C17 20, 15 26, 17 31 C19 36, 20 40, 20 40 C20 40, 21 36, 23 31 C25 26, 23 20, 21 18 C23 16, 25 13, 25 15 C25 11, 21 9, 20 10 Z",
              "M20 10 C18 8, 14 10, 14 15 C14 12, 16 15, 18 17 C16 19, 14 25, 16 30 C18 35, 20 40, 20 40 C20 40, 22 35, 24 30 C26 25, 24 19, 22 17 C24 15, 26 12, 26 15 C26 10, 22 8, 20 10 Z",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M20 15 C19 14, 16 16, 16 19 C16 17, 17 19, 19 20 C17 21, 16 25, 17 28 C18 31, 20 35, 20 35 C20 35, 22 31, 23 28 C24 25, 23 21, 21 20 C23 19, 24 17, 24 19 C24 16, 21 14, 20 15 Z"
          fill="#E10600"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </svg>
    </motion.div>
  )
}

export default function FloatingFlames() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <FloatingFlame
          key={i}
          left={`${15 + i * 15}%`}
          delay={i * 0.8}
          size={30 + Math.random() * 20}
        />
      ))}
    </div>
  )
}

