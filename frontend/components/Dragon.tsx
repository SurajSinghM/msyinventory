import { motion } from 'framer-motion'

interface DragonProps {
  size?: number
  className?: string
}

export default function Dragon({ size = 200, className = '' }: DragonProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Dragon body - flowing curve */}
        <motion.path
          d="M20 100 Q50 50, 80 70 T140 90 T180 100"
          stroke="#FFC72C"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Dragon scales */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={30 + i * 20}
            cy={85 + Math.sin(i) * 10}
            r="6"
            fill="#E10600"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        
        {/* Dragon head */}
        <motion.g
          animate={{
            x: [0, 5, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Dragon eye */}
          <circle cx="175" cy="95" r="8" fill="#FFC72C" />
          <circle cx="175" cy="95" r="4" fill="#E10600" />
          
          {/* Dragon horn */}
          <motion.path
            d="M165 85 L170 75 L175 85"
            stroke="#FFC72C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          
          {/* Dragon mouth */}
          <path
            d="M185 100 Q190 105, 195 100"
            stroke="#E10600"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
        
        {/* Flames from dragon */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`flame-${i}`}
            d={`M${20 + i * 8} ${105 + i * 2} Q${25 + i * 8} ${110 + i * 2}, ${30 + i * 8} ${105 + i * 2} Q${25 + i * 8} ${115 + i * 2}, ${20 + i * 8} ${105 + i * 2}`}
            fill="#FF6B35"
            opacity={0.7}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 0.9, 0.5],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

